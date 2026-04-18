import { Router } from "express";
import { db, visitsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/visits", async (_req, res) => {
  try {
    const rows = await db.select().from(visitsTable);
    const counts: Record<string, number> = {};
    for (const row of rows) {
      counts[row.domain] = row.count;
    }
    res.json({ counts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch visits" });
  }
});

router.post("/track", async (req, res) => {
  const { domain } = req.body as { domain?: string };
  if (!domain || typeof domain !== "string") {
    res.status(400).json({ error: "domain is required" });
    return;
  }
  try {
    await db
      .insert(visitsTable)
      .values({ domain, count: 1 })
      .onConflictDoUpdate({
        target: visitsTable.domain,
        set: {
          count: sql`${visitsTable.count} + 1`,
          updatedAt: sql`now()`,
        },
      });
    const [row] = await db
      .select({ count: visitsTable.count })
      .from(visitsTable)
      .where(eq(visitsTable.domain, domain));
    res.json({ domain, count: row?.count ?? 1 });
  } catch (err) {
    res.status(500).json({ error: "Failed to track visit" });
  }
});

export default router;
