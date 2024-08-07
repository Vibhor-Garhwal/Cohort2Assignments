import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signInInput, signUpInput } from '../zod';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    }
}>();;


//the signup route for the user
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg:"Invalid input sent"
    })
  }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
  try {
    //check if the user exists or not or the emailis taken or not, here email and the username both are unique so both should be available
    const checkUser = await prisma.user.findMany({
      where: {
        OR: [
          { username: body.username },
          { email: body.email }
        ]
      }
    });
    if (checkUser.length > 0) {
      return c.json({ message: "the username or the email already exists" });
    }
    //if the user doesnt exists then create the user and return the token to the frontend
        const user = await prisma.user.create({
            data: {
              email: body.email,
              password: body.password,
              username:body.username
            }
          });
          const token = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({token:`Bearer ${token}`}); //here we are giving the jwt directly but we can do like {Bearer <jwt>}
    } catch (err) {
        console.log(err);
        c.status(403);
        return c.text(`An error occurred ${err}`);
    }
})

// - POST /users/signin - User login.
// Inputs: email, password
// Actions: Authenticate the user. Return a token (JWT) for authorization in subsequent requests if successful, or an error message if authentication fails.

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg:"Invalid input sent"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
         email: body.email,
         password:body.password,
       }
      });
   
     //if user is not found then return the status
     if (!user) {
         c.status(403); //403 is for unauthorized access
         return c.json({ error: "user not found" });
     }
   
     //if user is found then return the jwt token
     const token = await sign({ id: user.id }, c.env.JWT_SECRET);
     return c.json({token:`Bearer ${token}`});
  } catch (error) {
    console.log(error);
        c.status(411);
        return c.text('Invalid email/password');
  }
})