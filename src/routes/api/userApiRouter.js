import express from 'express';
import userApiController from '../../controllers/users/userApiController.js';
const router = express.Router();
import isLoggedInAPI from '../../middlewares/authMiddleware.js';

router.get("/", userApiController.getAll);   //indicar la ruta en app.js, definir controller y método correspondiente

router.get("/:id",userApiController.getById);

router.get("/profile/:id", isLoggedInAPI, userApiController.getProfile);  //pasar el middleware a la ruta que quiero proteger

router.post("/", userApiController.create); 

router.put("/:id",userApiController.edit);

router.delete("/:id",userApiController.remove);

export default router;