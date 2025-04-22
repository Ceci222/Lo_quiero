import express from 'express';
/*TODO: importar aquí el controller correspondiente */

const router = express.Router();

router.get("/", pickupApiController.getAll);

router.get("/:id", pickupApiController.getByID); 

router.post("/", pickupApiController.create); 

router.put("/:id", pickupApiController.update);

router.delete("/:id", pickupApiController.delete);

export default router;