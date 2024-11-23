import Expense from '../model/ExpenseModel.js';

//add new expense
export const createExpense = async (req, res) => {
    try{
        const expense = new Expense(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    }catch (error) {
        res.status(400).json({ msg: error.msg })
    }
};

//get expenses
export const getExpenses = async (req, res) => {
    const { category } = req.query; // Extract category from query parameters
  
    try {
      let expenses;
      if (category) {
        // Filter by category if the query parameter exists
        expenses = await Expense.find({ category }); // Assuming you're using Mongoose
      } else {
        // Otherwise, fetch all expenses
        expenses = await Expense.find();
      }
  
      res.status(200).json(expenses); // Send filtered or all expenses
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Error fetching expenses' });
    }
  };
  

//get expenses by id (still not sure about this)
export const getExpenseById = async (req, res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(expense){
            res.status(200).json(expense);
        }else{
            res.status(404).json({ msg: "Expense not found" });
        }
    }catch (error){
        res.status(500).json({ msg: error.msg })    
    }
};

//get expenses by category
export const getExpenseByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category) return res.status(400).json({ message: "Category is required" });

        const expenses = await Expense.find({ category });
        if (expenses.length === 0) return res.status(404).json({ message: "No expenses found" });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }

};

//update an expense
export const updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedExpense) {
            res.status(200).json(updatedExpense);
        } else {
            res.status(404).json({ msg: "Expense not found" });
        }
    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
};

//delete expense
export const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (deletedExpense) {
            res.status(200).json(deletedExpense);
        } else {
            res.status(404).json({ msg: "Expense not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.msg });
    }
};



