import { createMiddleware } from "hono/factory";
import { createDB } from "@repo/db/drizzle";
import { Variables } from "..";
import { Bindings } from "..";

const database = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const db = createDB(c.env.DATABASE_URL);
  c.set("db", db);
  await next();
});

export { database };
