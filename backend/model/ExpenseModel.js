import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description:{type: String, required: true},
    date: { type: Date, default: Date.now },
    category: { type: String, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;


