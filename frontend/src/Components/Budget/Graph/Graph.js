import React, { useEffect, useState } from "react";
import axios from "axios";
import './Graph.css';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
    const [totalAmount, setTotalAmount] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        axios.get(`/expenses?userId=${userId}`)
            .then((response) => {
                console.log(response.data.expenses)
                const fetchedExpenses = response.data.expenses;

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

    const Data = {
        labels: Object.keys(totalAmount), 
        datasets: [
            {
                label: 'Total Amount Spent',
                data: Object.values(totalAmount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="graph">
            <h1>Expense Graph</h1>
            <Bar data={Data} />
        </div>
    )
};


export default Graph;

