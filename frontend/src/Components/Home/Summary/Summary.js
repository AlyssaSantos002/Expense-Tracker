import React, { useEffect, useState } from "react";
import './Summary.css';
import axios from "axios";

const Summary = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalAmount, setTotalAmount] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        axios.get(`/expenses?userId=${userId}`)
            .then((response) => {
                console.log(response.data.expenses)
                const fetchedExpenses = response.data.expenses;
                setExpenses(fetchedExpenses);

                const totalExpense = fetchedExpenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {});

                setTotalAmount(totalExpense);
            })
            .catch((error) => {
                console.error('Error fetching Expenses:', error);
            });
    }, []);

    return (
        <div className="summary">
            <h2>Summary</h2>
            <div className="summary-info">
                <ul>
                    {Object.entries(totalAmount).map(([category, total], index) => {
                        return (
                            <li key={index}>
                                <div className="category">
                                    {category}: 
                                </div>
                                <div className="amount">
                                    ${total.toFixed(2)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
};


export default Summary;