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
    const { userId, category, filterChoice} = req.query;

    const query = { user: userId };
    const now = new Date();

    if (category) query.category = category;

    //Filteration by last week
    if (filterChoice == "Last Week") {
      const startOfLastWeek = new Date(now);
      startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
      const endOfLastWeek = new Date(startOfLastWeek);
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

      query.date = {
        $gte: startOfLastWeek,
        $lt: endOfLastWeek,
      };
    }

    //Filteration by last month
    else if (filterChoice === "Last Month") {
      const now = new Date();
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); 
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); 
    
      query.date = {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      };
    }
    
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
    const {id} = req.params;
    const query = {
      _id: id
    }

    // Fetch the expense from the database
    const expense = await Expense.findOne(query); // Replace `_id` with your field if different

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
    const { id } = req.params; // Extract expense ID from URL params
    const { title, amount, description, date, category, userId } = req.body; // Extract fields from request body

    const updatedData = {};
    // For partial updates
    if (title) updatedData.title = title;
    if (amount) updatedData.amount = amount;
    if (description) updatedData.description = description;
    if (date) updatedData.date = date;
    if (category) updatedData.category = category;
    if (userId) updatedData.user = userId;

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

