import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import authMiddleware from "../middlewares/auth";
import { signupInput,signinInput } from "@devnick1010/medium-common";
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userid: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({message:"Input not correct"})
  }
  // hash_pass
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "signed up!", token });
  } catch (error) {
    c.status(411);
    return c.json({ message: "signup failed!", error: error });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({message:"Input not correct"})
  }

  // zod and hash_pass
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid credentials!" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ message: "signed in!", token });
  } catch (error) {
    c.status(411);
    return c.json({ message: "signup faild!", error: error });
  }
});

userRouter.get("/logout", authMiddleware, async (c) => {
         c.header("Authenticate","")
  return c.json({ message: "logout success." });
});

export default userRouter;
