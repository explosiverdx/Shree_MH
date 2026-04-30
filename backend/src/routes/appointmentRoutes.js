import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/", protect, authorize("admin"), getAppointments);
router.patch("/:id/status", protect, authorize("admin"), updateAppointmentStatus);
router.delete("/:id", protect, authorize("admin"), deleteAppointment);

export default router;
