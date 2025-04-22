import express from 'express';
/*TODO: importar aquí el controller correspondiente */

const router = express.Router();

router.get("/", userApiController.getAll);   //TODO: indicar la ruta en app.js, definir controller y método correspondiente

router.get("/:id",userApiController.getByID);

router.put("/:id",userApiController.update);

router.delete("/:id",userApiController.remove);

export default router;