import { Router } from "express";
import userApiRouter from "./userApiRouter.js";
/*import objectRouter from "./objectRouter.js";
import authRouter from "./authRouter.js"; */
import pickupApiRouter from "./pickupApiRouter.js";

 
const router = Router();

router.get("/", (req, res) => {
    res.send("Testing app");
})

router.use("/user", userApiRouter);
/*router.use("/object",objectApiRouter); */
router.use("/pickup", pickupApiRouter);
/* router.use("/", authApiRouter);
 */
export default router;