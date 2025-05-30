import express from 'express';
import objectApiController from '../../controllers/objects/objectApiController.js';
import isLoggedInAPI from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", objectApiController.getAll);  

router.get("/available", isLoggedInAPI, objectApiController.getAvailableForUser); //el id viene del token

router.get("/:id",objectApiController.getById);

router.post("/", isLoggedInAPI, objectApiController.create); 

router.post("/:id/accept", isLoggedInAPI, objectApiController.accept);

router.post("/:id/reject", isLoggedInAPI, objectApiController.reject);

router.put("/:id",isLoggedInAPI, objectApiController.edit);

router.delete("/:id", isLoggedInAPI, objectApiController.remove);

export default router;