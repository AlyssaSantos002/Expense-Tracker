import { useState } from 'react';
import './Expense.css'
import AddExpense from './Crud-Expense/AddExpense';
import ExpensesList from './Crud-Expense/ExpensesList';
import DeleteExpense from './Crud-Expense/DeleteExpense';
import UpdateExpense from './Crud-Expense/UpdateExpense';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBarComponent from '../Navbar/navbar';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false); // For AddExpense lightbox
  const [showUpdateExpense, setShowUpdateExpense] = useState(false); // For UpdateExpense lightbox
  const [selectedExpense, setSelectedExpense] = useState(''); // State for selected expense

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpense = (updatedExpense) => {
    if (!selectedExpense) {
      setShowUpdateExpense(false);
    } else {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === updatedExpense._id ? updatedExpense : expense
        )
      );
    }
    setShowUpdateExpense(false); // Close modal after updating
    setSelectedExpense(null); // Clear selected expense
  };


  return (
    <>
      <NavBarComponent />
      <div className="expense">
        <ExpensesList
          expenses={expenses}
          setExpenses={setExpenses}
          setSelectedExpense={setSelectedExpense} // Pass to ExpensesList
          selectedExpense={selectedExpense}
        />

        {console.log(`Selected expense: ${selectedExpense}`)}

        <div className='expense-btns'>
          <DeleteExpense
            setSelectedExpense={setSelectedExpense}
            selectedExpense={selectedExpense}
            setExpenses={setExpenses}
          />


          <button className='update-btn' onClick={() => setShowUpdateExpense(true)}>Update Selected Expense</button>
          {showUpdateExpense && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-modal" onClick={() => setShowUpdateExpense(false)}>
                  <i className="bi bi-x-square"></i>
                </button>
                <div className='expense-form'>
                  <UpdateExpense
                    selectedExpense={selectedExpense}
                    onUpdateExpense={updateExpense}
                    setShowUpdateExpense={setShowUpdateExpense}
                  />
                </div>

              </div>
            </div>
          )}


          <button className='add-btn' onClick={() => setShowAddExpense(true)}>Add Expense</button>
          {showAddExpense && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-modal"
                  onClick={() => setShowAddExpense(false)}
                >
                  <i className="bi bi-x-square"></i>
                </button>
                <div className="expense-form">
                  <AddExpense
                    onAddExpense={(expense) => {
                      addExpense(expense);
                      setShowAddExpense(false); // Close modal after adding expense
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Expense;
