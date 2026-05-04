import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createDB } from "@repo/db/drizzle";
import { betterAuth } from "better-auth";
import { AuthEnv } from "./types";

export function createAuth(env: AuthEnv) {
  const db = createDB(env.DATABASE_URL);
  return betterAuth({
    appName: "linear.in",
    baseURL: process.env.BETTER_AUTH_URL!,
    secret: process.env.BETTER_AUTH_SECRET!,
    database: drizzleAdapter(db, { provider: "pg" }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // refresh session if older than 1 day
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5, // cache in cookie for 5min reduces DB reads
      },
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL!],
  });
}

const db = createDB(process.env.DATABASE_URL!);
export const auth = betterAuth({
  appName: "linear.in",
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh session if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache in cookie for 5min reduces DB reads
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
});

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];
export type User = Session["user"];
