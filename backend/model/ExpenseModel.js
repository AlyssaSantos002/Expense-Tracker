import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description:{type: String, required: false},
    date: { type: Date, default: Date.now, required: true},
    category: { type: String, required: true }
    //user
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;


