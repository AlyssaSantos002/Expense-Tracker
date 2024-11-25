import React, { useState, useEffect } from 'react';

const ExpensesList = () => {
  const [category, setCategory] = useState(''); // Selected category
  const [expenses, setExpenses] = useState([]); // Expenses list
  const [selectedExpense, setSelectedExpense] = useState(); // Selected expense for delete

  // Fetch all expenses on initial load (when the component mounts)
  useEffect(() => {
    handleGetExpenses();
  }, []); // Empty dependency array to run only once on mount

  const handleGetExpenses = async (e) => {
    if (e) e.preventDefault();

    try {
      const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage

      // Build the fetch URL
      let url = `/expenses?userId=${userId}`;
      if (category) {
        url += `&category=${category}`; // Add category filter if selected
      }

      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setExpenses(result.expenses); // Update expenses state
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleRadioChange = (expenseId) => {
    console.log("Radio button clicked, Expense ID:", expenseId); //check if id gets passed on
    // Set selected expense when a radio button is clicked
    setSelectedExpense(expenseId);

  };

  const handleDeleteExpense = async () => {
    try {
      if (!selectedExpense) {
        alert("Please select an expense to delete.");
        return;
      }

      console.log("Deleting expense ID:", selectedExpense); // Log selected expense ID

      const response = await fetch(`/expenses/${selectedExpense}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete response:", result); // Log the server response

      // Remove deleted expense from the state
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== selectedExpense)
      );
      setSelectedExpense(null); // Clear selected expense
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Date formatting
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div>
      <h1>Get Expenses</h1><br />
      <form onSubmit={handleGetExpenses}>
        <label>
          Category:&nbsp;
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- All Categories --</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Household">Household</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </label>
        &nbsp;
        <button type="submit">Get Expenses</button>
      </form> <br />

      <ul className='expense-list'>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <input
              type="radio"
              name="expense"
              checked={selectedExpense === expense._id}
              onChange={() => handleRadioChange(expense._id)} // Pass the correct expense ID
            />
            {console.log("Expense ID:", expense._id)} {/* Debug */}
            {console.log("Selected expense ID for delete:", selectedExpense)} {/* Debug */}
            <strong>{expense.title}</strong> - ${expense.amount} on {formatDate(expense.date)} ({expense.category})
          </li>
        ))}
      </ul>

      <br />
      <button onClick={handleDeleteExpense}>Delete Selected Expense</button>
    </div>
  );
};

export default ExpensesList;
