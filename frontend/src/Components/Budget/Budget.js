import React, { useState } from 'react';
import GetBudget from './Crud-Budget/GetBudget';
import AddBudget from './Crud-Budget/AddBudget';
import NavBarComponent from '../Navbar/navbar';
import Graph from "../Budget/Graph/Graph";
import RemainingBudget from './Crud-Budget/RemainingBudget';
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

                    <div className='budget-top'>
                        <div className='budget-heading'>
                            <h1>Budget</h1>
                        </div>

                        {/* Add budget button */}
                        <button className='budget-btn' onClick={() => setShowBudgetForm(true)}>Update Budget</button>
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
                    </div>

                    <div>
                        <RemainingBudget budget={budget} />
                    </div>

                    <div className='getBudget'>
                        <GetBudget budget={budget} setBudget={setBudget} />
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
