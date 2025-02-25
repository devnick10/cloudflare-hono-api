import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middlewares/auth";
import { createBlogInput, updateBlogInput } from "@devnick1010/medium-common";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userid: string;
  };
}>();

blogRouter.post("/", authMiddleware, async (c) => {
  
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  
  
  const body = await c.req.json();
  const userid = c.get("userid")
  const {success} = createBlogInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({message:"Input not correct"})
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        autherId: userid,
      }
    })

    return c.json({ message: "blog created!",id:blog.id});
  } catch (error) {
    c.status(411);
    return c.json({ message: "blog creation failed!", error: error });
  }

});

blogRouter.put("/", authMiddleware, async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({message:"Input not correct"})
  }

  try {
    const blog = await prisma.blog.update({
      where:{
        id:body.id
      },
      data: {
        title: body.title,
        content: body.content,
        
      },
    });

    return c.json({ message: "blog updated!" });
  } catch (error) {
    c.status(411);
    return c.json({ message: "blog updation failed!", error: error });
  }

});

// Todo : add pagination after test
blogRouter.get("/bulk", async(c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
       select:{
        content:true,
        title:true,
        id:true,
        user:{
          select:{
            name:true,
          }
        }
       }
    });
    
    return c.json({ message: "blog fetched!", blogs });
  } catch (error) {
    c.status(411);
    return c.json({ message: "blog fetching failed!", error: error });
  }
});

blogRouter.get("/:id", authMiddleware, async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id")
  if (!id)return c.json({message:"Post id required"})

  try {
    const blog = await prisma.blog.findUnique({
      where:{id:id},
      select:{
        id:true,
        title:true,
        content:true,
        user:{
          select:{
            name:true
          }
        }
      }
    });
    
    return c.json({ message: "blog post fetched!", blog });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error fetching blog post", error: error });
  }


});
blogRouter.delete("/:id", authMiddleware, async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id")
  if (!id)return c.json({message:"Post id required"})

  try {
    const blog = await prisma.blog.delete({
      where:{id:id}
    });
    
    return c.json({ message: "blog post deleted!"});
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error deleting blog post", error: error });
  }


});



export default blogRouter;
