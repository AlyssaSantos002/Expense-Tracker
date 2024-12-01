import React, { useState, useEffect } from 'react';

const GetBudget = () => {
  const [budget, setBudget] = useState('');

  const handleBudget = async () => {
    try {
      const userID = localStorage.getItem('userId');

      const response = await fetch(`/budget?userId=${userID}`, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.budget.amount);
      if (!result.budget.amount){
        setBudget(0);
      }else{
        setBudget(result.budget.amount);
      }
      

    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };

  // Fetch budget on component mount
  useEffect(() => {
    handleBudget();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>{budget ? `Budget: $${budget}` : 'Loading...'}</h1>
    </div>
  );
};

export default GetBudget;
