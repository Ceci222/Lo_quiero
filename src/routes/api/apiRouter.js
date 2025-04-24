import { Router } from "express";
import userRouter from "./userRouter.js";
import objectRouter from "./objectRouter.js";
import pickupRouter from "./pickupRouter.js";
import authRouter from "./authRouter.js";
 
const router = Router();

router.get("/", (req, res) => {
    res.send("Testing app");
})

router.use("/user", userRouter);
router.use("/object",objectRouter);
router.use("/pickup", pickupRouter);
router.use("/", authRouter);

export default router;