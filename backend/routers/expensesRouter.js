//import express
import express from 'express';
// Create router
const router = express.Router();
//import conrollers/expenseController
import {createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense} from '../controllers/expenseController.js';

// Expense Routes
router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);
router.get("/expense/:id", getExpenseById);
router.put("/expense/:id", updateExpense);
router.delete("/expense/:id", deleteExpense);

export default router;