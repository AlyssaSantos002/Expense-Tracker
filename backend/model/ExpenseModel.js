import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description:{type: String, required: false},
    date: { type: Date, default: Date.now, required: true},
    category: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}// reference to the user
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;


