import Budget from "../model/BudgetModel.js";
import Expense from "../model/ExpenseModel.js";

// Create or Update Budget
export const createOrUpdateBudget = async (req, res) => {
  try {
    const { userId, amount, startDate, endDate } = req.body;

    if (!userId || !amount || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: userId }, // Match user's budget
      { amount, startDate, endDate }, // Update these fields
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.status(200).json({ success: true, message: "Budget saved successfully", budget });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error managing budget", error: error.message });
  }
};

// Get Remaining Budget
export const getRemainingBudget = async (req, res) => {
  try {
    const { userId } = req.params;

    const budget = await Budget.findOne({ user: userId });
    if (!budget) return res.status(404).json({ success: false, message: "No budget found" });

    const totalExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: budget.startDate, $lte: budget.endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const spent = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
    const remaining = budget.amount - spent;

    res.status(200).json({ success: true, budget: budget.amount, spent, remaining });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error calculating budget", error: error.message });
  }
};



// import Budget from '../model/BudgetModel';
// import Expense from '../model/ExpenseModel';
// import User from '../model/UserModel';

// export const createOrUpdateBudget = async (req, res) => {
//     try {
//         const { userId, amount, startDate, endDate } = req.body;
//         const user = await User.findById(userId);

//         const budget = await Budget.findOneAndUpdate(
//             {amount, startDate, endDate, user},
//             { new: true, upsert: true }
//         );

//         res.status(200).json(budget);
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Error managing budget', error
//         });
//     }
// };

// export const getRemainingBudget = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const user = await User.findById(userId);

//         const budget = await Budget.findOne({ user });
//         if (!budget) return res.status(404).json({ message: 'No budget found' });

//         const totalExpenses = await Expense.aggregate([
//             {
//                 $match: {
//                     user: user,
//                     date: { $gte: budget.startDate, $lte: budget.endDate }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     total: { $sum: '$amount' }
//                 }
//             }
//         ]);

//         const spent = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
//         const remaining = budget.amount - spent;

//         res.status(200).json({ budget: budget.amount, spent, remaining });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Error calculating budget', error
//         });
//     }
// };


