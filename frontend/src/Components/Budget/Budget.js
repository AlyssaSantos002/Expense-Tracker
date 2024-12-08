import React, { useState } from 'react';
import GetBudget from './Crud-Budget/GetBudget';
import AddBudget from './Crud-Budget/AddBudget';
import NavBarComponent from '../Navbar/navbar';
import Graph from "../Budget/Graph/Graph";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Budget.css';
import '../Expense/Expense.css';

const Budget = () => {
    const [budget, setBudget] = useState({});
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    const addBudget = (newBudget) => {
        setBudget(newBudget);
    };

    return (
        <div>

            <NavBarComponent />
            <div className="budget">
                <div className="budget-container">
                    <GetBudget budget={budget} setBudget={setBudget} />

                    <div className='budget-btns'>

                        {/* Add budget button */}
                        <button className='budget-btn' onClick={() => setShowBudgetForm(true)}>Add Budget</button>
                        {showBudgetForm && (
                            <div className='modal-overlay'>
                                <div className='modal-content'>
                                    <button className="close-modal" onClick={() => setShowBudgetForm(false)}>
                                        <i className="bi bi-x-square"></i>
                                    </button>
                                    <div className='expense-form'>
                                        <AddBudget onAddBudget={(budget) => {
                                            addBudget(budget);
                                            setShowBudgetForm(false);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {console.log(budget)}
                        {console.log(`Start date: ${budget.startDate}`)}

                    </div>

                </div>
                <div className="graph-section">
                    <Graph budget={budget} /> {/* Pass budget to Graph if needed */}
                </div>
            </div>

        </div>
    );
};

export default Budget;
