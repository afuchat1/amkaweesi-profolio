import { Router, type IRouter } from "express";
import healthRouter from "./health";
import visitsRouter from "./visits";
import adProxyRouter from "./ad-proxy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(visitsRouter);
router.use(adProxyRouter);

export default router;
