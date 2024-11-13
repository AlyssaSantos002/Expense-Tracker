//import express
import express from 'express';
// Create router
const router = express.Router();
//import conrollers/expenseController
import {createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense} from '../controllers/expenseController.js';

router.post('/expenses', createExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpenseById);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;