import React from "react";

const DeleteExpense = ({ setSelectedExpense, selectedExpense, setExpenses }) => {
  const handleDeleteExpense = async () => {
    try {
      if (!selectedExpense) {
        alert("Please select an expense to delete.");
        return;
      }

      console.log("Deleting expense ID:", selectedExpense);

      const response = await fetch(`/expense/${selectedExpense}`, {
        method: "DELETE",
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Expense deleted successfully!');
      }else{
        alert(result.message || 'Failed to delete expense.');
      }

      // Update the expenses state
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== selectedExpense)
      );
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <button className="dlt-btn" onClick={handleDeleteExpense}>Delete Selected Expense</button>
  );
};

export default DeleteExpense;
