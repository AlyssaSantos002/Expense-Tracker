import Expense from "../model/ExpenseModel.js";

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, description, date, category, userId } = req.body;

    if (!title || !amount || !description || !date || !category || !userId) {
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
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses", error: error.message });
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
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting expense", error: error.message });
  }
};


// import Expense from '../model/ExpenseModel.js';
// import User from '../model/UserModel.js';

// //add new expense
// export const createExpense = async (req, res) => {
//     try {
//         const {title, amount, description, date, category, userId} = req.body;

//         console.log(title, amount, description, date, category, userId);

//         if (!title || !amount || !description || !date || !category) {
//             return res.status(408).json({
//                 success: false,
//                 messages: "Please Fill all fields",
//             });
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         let newExpense = await Expense.create({
//             title: title,
//             amount: amount,
//             category: category,
//             description: description,
//             date: date,
//             user: userId,
//         });

//         user.expenses.push(newExpense);

//         user.save();

//         return res.status(200).json({
//             success: true,
//             message: "Transaction Added Successfully",
//         });
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             messages: error.message,
//         });
//     }
// };

// //get expenses
// export const getExpenses = async (req, res) => {
//     try {
//         const { userId, category } = req.query; // Extract category from query parameters

//         const user = await User.findById(userId);

//         console.log(user, category);
        
//         // confirm if it is user
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const expenses = await Expense.find({userId, category});

//         res.status(200).json(expenses); // Send filtered or all expenses

//     } catch (error) {
//         return res.status(500).json({
//             success: false, 
//             message: 'error fetching expenses' 
//         });
//     }
// };


// //update an expense
// export const updateExpense = async (req, res) => {
//     try {
//         const expenseId = req.params.id;
//         const { title, amount, description, date, category } = req.body;

//         console.log(title, amount, description, date, category);

//         const expense = await Expense.findById(expenseId);

//         if (!expense) {
//             return res.status(400).json({ message: "Expense not found" });
//         }

//         if (title) {
//             expense.title = title;
//         }
//         if (amount) {
//             expense.amount = amount;
//         }
//         if (description) {
//             expense.description = description;
//         }
//         if (category) {
//             expense.title = category;
//         }
//         if (date) {
//             expense.date = date;
//         }
//         return res.status(200).json({
//             success: false,
//             message: `Transaction Updated Successfully`,
//             expenseConfirm: expense,
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// //delete expense
// export const deleteExpense = async (req, res) => {
//     try {
//         const expenseId = req.params.id;
//         const userId = req.body.userId;

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const expense = await Expense.findByIdAndDelete(expenseId);

//         if (!expense) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Expense not found",
//             });
//         }

//         const expenseArray = user.expenses.filter(
//             (expense) => expense._id === expenseId
//           );
      
//           user.expenses = expenseArray;
      
//           user.save();

//           return res.status(200).json({
//             success: true,
//             message: "Expense deleted",
//           });

//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             messages: error.message,
//           });
//     }
// };



