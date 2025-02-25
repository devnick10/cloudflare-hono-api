import { Hono } from 'hono'
import userRouter from "./routes/user"
import blogRouter from "./routes/blog"
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    CORS_ORIGIN:string
  }
  Variables:{
    userid:string
  }
}>()

// middlewares
app.use("*",async (c, next) => {

  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
  });
    
  return corsMiddlewareHandler(c, next);
})


// health-check
app.get('/health-check', (c) => {
  c.status(200)
  return c.text('Hello Hono!')
})


// routes 
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)




export default app

