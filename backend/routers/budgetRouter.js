import express from "express";
import {createOrUpdateBudget, getRemainingBudget} from "../controllers/budgetController.js";

const router = express.Router();

// Budget Routes
router.post("/budget", createOrUpdateBudget);
router.get("/budget/:userId", getRemainingBudget);

export default router;