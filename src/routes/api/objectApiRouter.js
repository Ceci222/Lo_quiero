import express from 'express';
import objectApiController from '../../controllers/object/objectApiController.js';

const router = express.Router();

router.get("/", objectApiController.getAll);   //TODO: indicar la ruta en app.js, definir controller y método correspondiente

router.get("/:id",objectApiController.getById);

router.post("/",objectApiController.create); //sólo indicar la ruta que lleva a la función que tiene que usar

router.put("/:id",objectApiController.edit);

router.delete("/:id",objectApiController.remove);

export default router;