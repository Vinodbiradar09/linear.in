import { Hono } from "hono";
import { database } from "./db/pg";
import { DrizzleDB } from "@repo/db/drizzle";
import { user } from "@repo/db/schema/schema";
import { Auth, Session, User } from "@repo/auth/auth";
import { protect } from "./middlewares/authMiddleware";

export type Bindings = {
  DATABASE_URL: string;
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  WEB_APP_URL: string;
};
export type Variables = {
  db: DrizzleDB;
  auth: Auth;
  session: Session | null;
  user: User | null;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.get("/users", protect, database, async (c) => {
  const db = c.get("db");
  const allUsers = await db.select().from(user);
  return c.json({ success: true, data: allUsers });
});

// protected
app.get("/me", protect, (c) => {
  return c.json({
    success: true,
    data: {
      user: c.get("user"),
      session: c.get("session"),
    },
  });
});

// app.post("/users", database, async (c) => {
//   const body = await c.req.json<InsertUser>();
//   const db = c.get("db");
//   const [_user] = await db.insert(user).values(body).returning();
//   return c.json({ success: true, data: _user }, 201);
// });

export default app;
