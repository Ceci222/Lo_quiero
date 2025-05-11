import { Router } from "express";
import userApiRouter from "./userApiRouter.js";
import objectApiRouter from "./objectApiRouter.js";
import authApiRouter from "./authApiRouter.js"; 
import pickupApiRouter from "./pickupApiRouter.js";
import cloudinaryRouter from "./cloudinaryRouter.js";
 
const router = Router();

router.get("/", (req, res) => {
    res.send("Testing app");
})

router.use("/user", userApiRouter);
router.use("/object",objectApiRouter);
router.use("/pickup", pickupApiRouter);
router.use('/cloudinary', cloudinaryRouter);
router.use("/", authApiRouter);

export default router;