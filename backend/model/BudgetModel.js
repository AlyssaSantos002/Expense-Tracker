import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
    amount:{type: Number, required: true},
    starDate:{type: Date, required: true},
    endDate:{type: Date, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} // Link to User
});

const Budget = mongoose.model('Budget', BudgetSchema);

export default Budget;