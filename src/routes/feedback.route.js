import { Router } from "express";
import {
  createFeedBack,
  deleteFeedback,
  getAllFeedbacks,
  getAllFeedbacksAdmin,
  updateFeedback,
} from "../controllers/feedback.controller";
import { auth, isAdmin } from "../middleware/auth.middleare";

const feedBackRoutes = Router();

feedBackRoutes.post("/feedback", auth, createFeedBack);
feedBackRoutes.get("/feedback", auth, getAllFeedbacks);
feedBackRoutes.patch("/feedback/update/:id", auth, updateFeedback);
feedBackRoutes.delete("/feedback/delete/:id", auth, isAdmin, deleteFeedback);
feedBackRoutes.get("/feedback/admin", auth, isAdmin, getAllFeedbacksAdmin);

export default feedBackRoutes;
