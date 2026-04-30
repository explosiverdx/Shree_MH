import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment
} from "../controllers/departmentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getDepartments)
  .post(protect, authorize("admin"), createDepartment);

router.route("/:id")
  .put(protect, authorize("admin"), updateDepartment)
  .delete(protect, authorize("admin"), deleteDepartment);

export default router;
