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

// Get Initial Budget
export const getBudget = async (req, res) => {
  try{
    const { userID } = req.body;

    const budget = await Budget.findOne(userID);
    if (!budget) return res.status(404).json({ success: false, message: "No budget found" });

    res.status(200).json({ success: true, message: "Budget found: $", budget });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error finding budget.", error: error.message });
  }
};


// Get Remaining Budget
export const getRemainingBudget = async (req, res) => {
  try {
    const { userId } = req.params;

    const budget = await Budget.findOne(userId);
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
