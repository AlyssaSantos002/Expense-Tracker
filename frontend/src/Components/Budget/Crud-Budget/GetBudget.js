import React, { useState, useEffect } from 'react';

const GetBudget = ({budget, setBudget}) => {

  const handleBudget = async () => {
    try {
      const userID = localStorage.getItem('userId');

      const response = await fetch(`/budget?userId=${userID}`, { method: 'GET' });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        setBudget(result.budget);
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
      <h1>Budget: ${budget.amount}</h1>
    </div>
  );
};

export default GetBudget;
