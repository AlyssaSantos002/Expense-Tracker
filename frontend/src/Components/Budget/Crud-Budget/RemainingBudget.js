import React, { useState, useEffect } from 'react';
import '../Budget.css';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const RemainingBudget = ({ budget }) => {
    const [spent, setSpent] = useState(0);
    const [totalAmount, setTotalAmount] = useState({});
    const [remaining, setRemaining] = useState(budget.amount);

    const gragh = async () => {
        try {
            const userID = localStorage.getItem('userId');
            const response = await fetch(`/expenses?userId=${userID}`, { method: 'GET' });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log({ result });

                const fetchedExpenses = result.expenses || [];

                const totalExpense = fetchedExpenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {});
                setTotalAmount(totalExpense);

                const totalSpent = fetchedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                setSpent(totalSpent);

                const remainingBudget = budget.amount - totalSpent;
                setRemaining(remainingBudget);
            }
        } catch (error) {
            console.error('Error fetching budget:', error);
        }
    };

    useEffect(() => {
        gragh();
    }, [budget]);

    const chartData = {
        labels: ['Remaining', 'Spent'],
        datasets: [
            {
                data: [remaining, spent],
                backgroundColor: ['#4caf50', '#f44336'],
                hoverBackgroundColor: ['#45a049', '#e53935'],
            },
        ],
    };

    return (
        <>
            <div className='budget-graph'>
                <Doughnut data={chartData} options={{ responsive: true, plugins: { tooltip: { enabled: true } } }} />
            </div>
            <div className='budget-bottom'>
                <p>Budget: ${budget.amount}</p>
                <p>Remaining: ${remaining}</p>
                <p>Spent: $ {spent}</p>
            </div>
        </>
    );
};

export default RemainingBudget;
