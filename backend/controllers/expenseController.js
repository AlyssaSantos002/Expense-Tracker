import Expense from "../model/ExpenseModel.js";

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, description, date, category, userId } = req.body;

    if (!title || !amount || !date || !category || !userId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const expense = await Expense.create({
      title,
      amount,
      description,
      date,
      category,
      user: userId,
    });

    res.status(201).json({ success: true, message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding expense", error: error.message });
  }
};

// Get Expenses (Filtered by Category)
export const getExpenses = async (req, res) => {
  try {
    const { userId, category } = req.query;

    const query = { user: userId };
    if (category) query.category = category;

    const expenses = await Expense.find(query);

     // Check if any expenses were found
     if (expenses.length === 0) {
      return res.status(200).json({ success: true, message: "No expenses found", expenses });
    }
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses", error: error.message });
  }
};
export const getExpenseById = async (req, res) => {
  try {
    const { expenseId } = req.body; // Use req.params for route-based ID

    // Fetch the expense from the database
    const expense = await Expense.find({_id:expenseId}); // Replace `_id` with your field if different

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "No expense found with the given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching expense",
      error: error.message,
    });
  }
};


// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const expense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

    res.status(200).json({ success: true, message: "Expense updated", expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating expense", error: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the expense from the database
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

