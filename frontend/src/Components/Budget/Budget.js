import React from 'react';
import GetBudget from './Crud-Budget/GetBudget';
import AddBudget from './Crud-Budget/AddBudget';
import NavBarComponent from '../Navbar/navbar';
import Graph from "../Budget/Graph/Graph";
import './Budget.css';
const Budget = () => {
    return (
        <div>
            <>
                <NavBarComponent />
                <div className="budget">
                    <div className="budget-container">
                        < GetBudget />
                        <AddBudget />
                    </div>
                    <div className="graph-section">
                        <Graph />
                    </div>
                </div>
            </>
        </div >
    )
}

export default Budget;