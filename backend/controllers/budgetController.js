import Budget from "../model/BudgetModel.js";
import Expense from "../model/ExpenseModel.js";

// Create or Update Budget
export const createOrUpdateBudget = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const budget = await Budget.findOneAndUpdate(
      { user: userId }, // Match user's budget
      { amount}, // Update these fields
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


