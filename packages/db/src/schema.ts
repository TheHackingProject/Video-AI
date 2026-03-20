import { index, integer, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const videos = pgTable(
  "videos",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: varchar("slug", { length: 120 }).notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("videos_slug_unique").on(table.slug)],
);

export const videoVersions = pgTable(
  "video_versions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    videoId: integer("video_id").notNull().references(() => videos.id, { onDelete: "cascade" }),
    compositionId: varchar("composition_id", { length: 120 }).notNull(),
    renderUrl: text("render_url").notNull(),
    docUrl: text("doc_url").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("video_versions_video_id_idx").on(table.videoId)],
);

export const feedbackThreads = pgTable("feedback_threads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  videoId: integer("video_id").notNull().references(() => videos.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const feedbackComments = pgTable("feedback_comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  threadId: integer("thread_id").notNull().references(() => feedbackThreads.id, { onDelete: "cascade" }),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  body: text("body").notNull(),
  timestampSeconds: integer("timestamp_seconds"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
