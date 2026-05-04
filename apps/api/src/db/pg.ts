import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@repo/db/schema/schema";
import { createMiddleware } from "hono/factory";
import { Variables, Bindings } from "..";

const database = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const pg = neon(c.env.DATABASE_URL);
  c.set("db", drizzle(pg, { schema }));
  await next();
});

export { database };
