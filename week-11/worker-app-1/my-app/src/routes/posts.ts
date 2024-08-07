import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { createPostInput, updatePostInput } from '../zod';

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

postRouter.use("/*",async (c, next) => {
    //extract the userId and validate as well the userId
    // and pass this dowm to the other routes to use it
    const authHeader = c.req.header("Authorization") || ""; // in the frontend we store the token as Bearer <token> in the Authorization header and this is how we access the headers in Hono    here we have added the "" empty string to make the type of the token as string or it woul have ben undefined

    try {
        const token = authHeader.split(" ")[1];
        // console.log(token);
        const user = await verify(token, c.env.JWT_SECRET);

        if (user) {
            c.set('userId', String(user.id));
            // console.log(c.get("userId"));
            await next();
        }
        else {
            c.status(403);
            return c.json({
              msg:"you are now logged in"
           })
        }
    } catch (error) {
        c.status(411);
        // console.log(error);
        return c.json({ error });
    }
})

postRouter.get('/test', (c) => {
    return c.text("test successfull")
})

/*
POST /posts - Create a new blog post.
Inputs: title, body
Actions: Create a new blog post associated with the authenticated user. Require authentication.
 */

postRouter.post('', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg:"Invalid input sent"
        })
    }
    const userId = Number(c.get("userId"));
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
        data: {
            title: body.title,
            body: body.body,
            authorId: userId, //the userId is extracted from the middlewAare
            tags:body.tags||[]
        }
    })
    // console.log("blog is",blog);
    return c.json({ id: post.id });
})


//get all the posts here this will only work if the user is signed in as the middleware is for all the routes
postRouter.get('',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    try { const posts = await prisma.post.findMany({
        select: {
            title: true,
            body: true,
            id: true,
            author: {
                select: {
                    username:true
                }
            }
        }
    });//no options means give all the blogs
        return c.json(posts);
    }
    catch (error) {
        console.log(error);
        return c.status(403);
    }
})

/*
GET /posts/:id - Retrieve a single blog post by ID.
Actions: Fetch details of a specific blog post. Can be public or have additional details/edit capabilities for the owner. 
*/
postRouter.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }, select: {
                id:true,
                title: true,
                body: true,
                author: {
                    select: {
                        username:true
                    }
                }
            }
        });
        return c.json({ "post": post });
    }
    catch (error) {
        console.log(error);
        c.status(411);
        return c.json({
            msg:"some error occurred"
        })
    }
})

/**
 *  - PUT /posts/:id - Update a blog post by ID.
Inputs: title, body
Actions: Update the specified blog post if the authenticated user is the owner. Require authentication.
 */

postRouter.put('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
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
        const checkblog = await prisma.post.findMany({
            where: {
                id:id
            }
        })
        if (checkblog.length == 0) {
            return c.text('The blog id is incorrect');
        }

        const post = await prisma.post.update({
            where: {
                id:id
            }
            , data: {
                title: body.title,
                body: body.body,
                tags:body.tags||[]
            }
        });//no options means give all the blogs
            return c.json(post);
        }
        catch (error) {
            console.log(error);
            return c.status(403);
        }
})

/**
 * - DELETE /posts/:id - Delete a blog post by ID.
Actions: Delete the specified blog post if the authenticated user is the owner. Require authentication.
 */

postRouter.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const checkblog = await prisma.post.findMany({
            where: {
                id:id
            }
        })
        if (checkblog.length == 0) {
            return c.text('The blog id is incorrect');
        }

        const response = await prisma.post.delete({
            where: {
                id:id
            }
        })
        console.log(response);
        return c.text("The blog was deleted successfully");
    } catch (error) {
        console.log(error);
        c.status(409);
        return c.text("An error occurred while deleting the post");
    }
})

//get all the posts with a particular tag
postRouter.get('/filter', async (c) => {
    const tagsQuery = c.req.query('tags');
    // console.log(tagsQuery);
    const tags = tagsQuery ? tagsQuery.split(',') : [];
    
    console.log(`The query tags are: ${tags}`);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            where: {
                tags: {
                  hasSome:tags
              }
            }
          });
          return c.json(posts);
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ error: 'Internal Server Error' });
    }  
})