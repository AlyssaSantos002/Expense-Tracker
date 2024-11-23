import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    amount:{type: Number, required: true},
    starDate:{type: Date, required: true},
    endDate:{type: Date, required: true}
    //user
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;