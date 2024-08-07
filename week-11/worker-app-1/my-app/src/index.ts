import { Hono } from 'hono'
import { userRouter } from './routes/users'
import { postRouter } from './routes/posts'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables: {
    userId:number
  }
}>()

//cors middleware
app.use('/api/*', cors());



app.route('/users', userRouter);
app.route('/posts', postRouter);
app.get('/test', (c) => {
  return c.text("hello there");
})

export default app
