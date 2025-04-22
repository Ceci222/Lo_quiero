import express from 'express';
/*TODO: importar aquí el controller correspondiente */

const router = express.Router();

router.get("/", objectApiController.getAll);   //TODO: indicar la ruta en app.js, definir controller y método correspondiente

router.get("/:id",objectApiController.getByID);

router.post("/",objectApiController.create); //sin ;id, no lo va a tomar de los params pq se genera automáticamente

router.put("/:id",objectApiController.update);

router.delete("/:id",objectApiController.remove);

export default router;