import express from 'express';
import userApiController from '../../controllers/users/userApiController.js';
const router = express.Router();

router.get("/", userApiController.getAll);   //TODO: indicar la ruta en app.js, definir controller y método correspondiente

router.get("/:id",userApiController.getById);

router.post("/", userApiController.create); 

router.put("/:id",userApiController.edit);

router.delete("/:id",userApiController.remove);

export default router;