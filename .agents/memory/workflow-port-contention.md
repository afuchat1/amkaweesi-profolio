---
name: Portfolio preview workflow
description: Non-obvious preview behavior for the portfolio artifact and its aggregate launcher.
---

The portfolio artifact has a dedicated workflow that owns its preview port. The aggregate application launcher may fail by trying to claim that same port and then moving to an unconfigured fallback port.

**Why:** Restarting the aggregate launcher does not fix a port already owned by the dedicated artifact workflow, and can make a healthy preview look broken.

**How to apply:** Verify and restart the dedicated portfolio workflow when validating the portfolio. Treat an aggregate launcher port timeout as a workflow configuration/contention issue unless the dedicated workflow is also unhealthy.