import { Hono } from 'hono'
import userRouter from "./routes/user"
import blogRouter from "./routes/blog"
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
  Variables:{
    userid:string
  }
}>()

// middlewares



// health-check
app.get('/health-check', (c) => {
  c.status(200)
  return c.text('Hello Hono!')
})


// routes 
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)




export default app

