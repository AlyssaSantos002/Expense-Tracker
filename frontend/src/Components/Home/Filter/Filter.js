import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Filter.css';

const Filter = () => {
    const [expenses, setExpenses] = useState([]);
    const [filterChoice, setFilterChoice] = useState('');
    const [customMonth, setCustomMonth] = useState("");
    const [customYear, setCustomYear] = useState("");

    const fetchFilter = async () => {

        const userId = localStorage.getItem('userId');
        
        axios.get(`/expenses?userId=${userId}&filterChoice=${filterChoice}`)
            .then((response) => {
                console.log(response.data.expenses)
                const fetchedExpenses = response.data.expenses;
                setExpenses(fetchedExpenses);
            })
            .catch((error) => {
                console.error('Error fetching Expenses:', error);
            });
    }

    useEffect(() => {
        if (filterChoice) {
            fetchFilter();;
        }
    }, [filterChoice, customMonth,customYear]);

    const handleFilter = (e) => {
        setFilterChoice(e.target.value);
    };

    return (
        <div className="filter">
            <div className="filter-option">
                <h2>Frequency</h2>
                <select onChange={handleFilter} value={filterChoice}>
                    <option value="" disabled>Select an option</option>
                    <option value="Last Week">Last Week</option>
                    <option value="Last Month">Last Month</option>
                </select>
            </div>

            <div className="filter-info">
                {expenses.length === 0 ? (
                    <p>No expense found</p>
                ) : (
                    <ul>
                        {expenses.map(expense => (
                            <li key={expense._id}>
                                <span className="filter-category">{expense.category}</span>
                                <span className="filter-amount">${expense.amount}</span>
                                <span className="filter-date">{new Date(expense.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div >
    )
}

export default Filter;