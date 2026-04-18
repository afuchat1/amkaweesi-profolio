import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const visitsTable = pgTable("visits", {
  domain: text("domain").primaryKey(),
  count: integer("count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Visit = typeof visitsTable.$inferSelect;
