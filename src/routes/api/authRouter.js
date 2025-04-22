import { Router } from "express";
//TODO: Importar controller

const router = Router();

router.post("/register",authApiController.register);
router.post("/login",authApiController.login);

export default router;
