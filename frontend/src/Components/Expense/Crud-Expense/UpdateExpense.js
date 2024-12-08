import React, { useState, useEffect } from 'react';
import moment from 'moment';

const UpdateExpense = ({ selectedExpense, onUpdateExpense }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('userId');

    // Fetch expense details when component mounts or expenseId changes
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch(`/expense/${selectedExpense}`, { method: "GET" });
                const data = await response.json();
                console.log('Fetched expense data:', data);
                
                setTitle(data.expense.title);
                setAmount(data.expense.amount);
                setCategory(data.expense.category);
                setDate(data.expense.date);
                setDescription(data.expense.description);

            } catch (error) {
                console.error('Error fetching expense:', error);
            }
        };

        if (selectedExpense) {
            fetchExpense();
        }
    }, [selectedExpense]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedExpense = { title, amount, category, date, description, userId};

        try {
            const response = await fetch(`/expense/${selectedExpense}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Expense updated successfully!');
                onUpdateExpense(result.expense); // Pass updated expense back to parent
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to update expense.');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };



    return (
        <form onSubmit={handleUpdate} className='update-expense-form'>
            <h1>Update Expense</h1>
            <br />
            <input type="text" placeholder={title} value={title}
                onChange={(e) => setTitle(e.target.value)}/>
           <br/>
            <input type="number" placeholder={amount} value={amount} min='0'
                onChange={(e) => setAmount(e.target.value)}/>
            <br/>
            
            <input className='desc-input' placeholder={description} value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            <br />
            <label>Category: 
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Housing">Housing</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
            </select></label>
            <br />
            <label>Date: &nbsp; 
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                &nbsp;&nbsp;{moment(date).format('ll')}
            </label>
            <br />
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default UpdateExpense;
