import React, { useState } from 'react';

const GetExpenses = () => {
  const [category, setCategory] = useState(''); // Selected category
  const [expenses, setExpenses] = useState([]); // Expenses list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleGetExpenses = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Build the fetch URL
      const url = category
        ? `/expenses?category=${category}`
        : `/expenses`;

      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setExpenses(result); // Update expenses state
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError(error.message); // Capture error
    } finally {
      setLoading(false);
    }
  };

  // Date formatting
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Customize format
    const date = new Date(dateString); // Convert string to Date object
    return new Intl.DateTimeFormat('en-US', options).format(date); // Format the date
  };

  return (
    <div>
      <h1>Get Expenses</h1>
      <form onSubmit={handleGetExpenses}>
        <label>Category: &nbsp;
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
        </select> &nbsp;
        </label>
        <button type="submit">Get Expenses</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.title}</strong> - ${expense.amount} on {formatDate(expense.date)} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetExpenses;
