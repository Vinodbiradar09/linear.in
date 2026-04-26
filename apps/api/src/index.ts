import { Hono } from "hono";
import { database } from "./db/db";
import { DrizzleDB } from "@repo/db/drizzle";
import { users, InsertUser } from "@repo/db/schema/schema";

export type Bindings = {
  DATABASE_URL: string;
};
export type Variables = {
  db: DrizzleDB;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.get("/users", database, async (c) => {
  const db = c.get("db");
  const allUsers = await db.select().from(users);
  return c.json({ success: true, data: allUsers });
});

app.post("/users", database, async (c) => {
  const body = await c.req.json<InsertUser>();
  const db = c.get("db");
  const [user] = await db.insert(users).values(body).returning();
  return c.json({ success: true, data: user }, 201);
});

export default app;
