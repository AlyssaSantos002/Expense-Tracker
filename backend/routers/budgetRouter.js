import express from "express";
import {createOrUpdateBudget, getBudget, getRemainingBudget} from "../controllers/budgetController.js";
import { get } from "mongoose";

const router = express.Router();

// Budget Routes
router.post("/budget", createOrUpdateBudget);
router.get("/budget", getBudget);
router.get("/budget", getRemainingBudget);

export default router;