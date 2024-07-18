// routes/eventRoutes.js
import express from "express";
import {
  createEvent,
  getEvents,
  getUserEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import Auth from "../middleware/auth.js"; // assuming verifyUser middleware is in auth.js
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", Auth, upload, createEvent);
router.get("/", Auth, getEvents);
router.get("/user/:userId", Auth, getUserEvents);
router.get("/:id", getEventById);
router.put("/update/:id", Auth, upload, updateEvent);
router.delete("/delete/:id", Auth, deleteEvent);

export default router;
