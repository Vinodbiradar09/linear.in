import { createMiddleware } from "hono/factory";
import { createAuth, Auth } from "@repo/auth/auth";
import { Bindings, Variables } from "..";

let _auth: null | Auth = null;

function getAuth(env: Bindings): Auth {
  if (!_auth) {
    _auth = createAuth(env);
  }
  return _auth;
}

export const protect = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const auth = getAuth(c.env);
  c.set("auth", auth);
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session || !session.user) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    c.set("session", session);
    c.set("user", session.user);
  } catch (e) {
    console.log("error in auth", e);
    return c.json({ success: false, error: "Unauthorized" }, 401);
  }
  await next();
});
