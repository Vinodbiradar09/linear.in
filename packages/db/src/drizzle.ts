import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/schema";

export function createDB(databaseUrl: string) {
  const pg = neon(databaseUrl);
  return drizzle(pg, { schema });
}

export type DrizzleDB = ReturnType<typeof createDB>;
