import express from 'express';
import pickupApiController from "../../controllers/pickups/pickupApiController.js"  //importo el que interactúa con el cliente, no el de lógica

const router = express.Router();

router.get("/", pickupApiController.getAll);

router.get("/:id", pickupApiController.getByID); 

router.post("/", pickupApiController.create); 

router.put("/:id", pickupApiController.edit);

router.delete("/:id", pickupApiController.remove);

export default router;