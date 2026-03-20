import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  const sql = postgres(DATABASE_URL, { prepare: false });
  dbInstance = drizzle(sql, { schema });
  return dbInstance;
}
