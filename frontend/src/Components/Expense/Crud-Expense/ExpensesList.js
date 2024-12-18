import React, { useState, useEffect } from "react";
import moment from "moment";

const ExpensesList = ({ expenses, setExpenses, setSelectedExpense, selectedExpense }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    const handleGetExpenses = async () => {
      try {
        const userId = localStorage.getItem("userId");

        let url = `/expenses?userId=${userId}`;
        if (category) {
          url += `&category=${category}`;
        }

        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setExpenses(result.expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    handleGetExpenses();

  }, [category, setCategory]);

  const handleRadioChange = (expenseId) => {
    console.log("Selected Expense ID:", expenseId);
    setSelectedExpense(expenseId);
  };

  return (
    <div>
      <div className="expense-info">
        <div className="expense-top">
          <h1>Expenses</h1>
          <label>
            <b>CATEGORY:</b>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- All Categories --</option>
              <option value="Housing">Housing</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Clothing">Clothing</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

      </div>
      <table className="expenses-list">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>
                <input type="radio" name="expense" checked={selectedExpense === expense._id}
                  onChange={() => handleRadioChange(expense._id)}
                />
              </td>
              <td>{expense.title}</td>
              <td>${parseFloat(expense.amount).toFixed(2)}</td>
              <td>{moment(expense.date).format("LL")}</td>
              <td className="desc">{expense.description}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesList;
