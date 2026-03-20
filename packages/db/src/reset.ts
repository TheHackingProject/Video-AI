import { sql } from "drizzle-orm";
import { getDb } from "./client";

async function reset() {
  const db = getDb();
  await db.execute(sql`TRUNCATE TABLE feedback_comments, feedback_threads, video_versions, videos RESTART IDENTITY CASCADE`);
  console.log("Database reset complete.");
}

reset().catch((error) => {
  console.error(error);
  process.exit(1);
});
