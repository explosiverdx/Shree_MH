import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctors,
  updateDoctor
} from "../controllers/doctorController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getDoctors)
  .post(protect, authorize("admin"), createDoctor);

router.route("/:id")
  .get(getDoctor)
  .put(protect, authorize("admin"), updateDoctor)
  .delete(protect, authorize("admin"), deleteDoctor);

export default router;
