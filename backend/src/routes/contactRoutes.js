import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContactStatus
} from "../controllers/contactController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", protect, authorize("admin"), getContacts);
router.patch("/:id/status", protect, authorize("admin"), updateContactStatus);
router.delete("/:id", protect, authorize("admin"), deleteContact);

export default router;
