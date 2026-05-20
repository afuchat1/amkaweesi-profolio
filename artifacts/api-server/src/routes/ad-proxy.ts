import { Router } from "express";

const router = Router();

const AD_URL =
  "https://zuekwzcnknkczelivurf.supabase.co/functions/v1/serve-ad" +
  "?publisher=c94c610f-685e-4834-bb39-be88049814d9" +
  "&site=d4c5ef0f-ed9c-496f-835d-d420a89091f4" +
  "&format=banner_300x250";

router.get("/ad", async (_req, res) => {
  try {
    const upstream = await fetch(AD_URL, {
      headers: { Accept: "text/html,application/xhtml+xml" },
    });

    const html = await upstream.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(html);
  } catch {
    res
      .status(200)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(
        `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:300px;height:250px;display:flex;align-items:center;justify-content:center;background:#f8f9fa;font-family:sans-serif;color:#94a3b8;font-size:12px}</style>
</head><body><span>Ad unavailable</span></body></html>`
      );
  }
});

export default router;
