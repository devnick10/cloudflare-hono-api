import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const auth = createMiddleware(async (c, next) => {
  const header = c.req.header("Authorization") || "";

  if (!header?.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ message: "Invalid token or token formate" });
  }

  try {
    const token = header.split(" ")[1];

    const decodeToken = await verify(token, c.env.JWT_SECRET);

    if (decodeToken) {
      c.set("userid", decodeToken.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Invalid or expire token" });
  }
});

export default auth;
