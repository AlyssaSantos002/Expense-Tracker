import React from "react";

const DeleteExpense = ({ selectedExpense, setExpenses }) => {
  const handleDeleteExpense = async () => {
    try {
      if (!selectedExpense) {
        alert("Please select an expense to delete.");
        return;
      }

      console.log("Deleting expense ID:", selectedExpense);

      const response = await fetch(`/expenses/${selectedExpense}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete response:", result);

      // Update the expenses state
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== selectedExpense)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <button className="dlt-btn" onClick={handleDeleteExpense}>Delete Selected Expense</button>
  );
};

export default DeleteExpense;
