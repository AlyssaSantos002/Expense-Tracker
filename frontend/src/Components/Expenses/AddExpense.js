import React, { useState } from 'react';

const AddExpense = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState ('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        const newExpense = { title, amount, description, date, category, userId };

        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExpense),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Expense added successfully!');
                setTitle('');
                setAmount('');
                setDescription('');
                setDate('');
                setCategory('');
            } else {
                alert(result.message || 'Failed to add expense.');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Expense</h1><br></br>
            <input type="text" placeholder="Title" value={title}
                onChange={(e) => setTitle(e.target.value)} required
            /><br/><br/>
            <input type="number" placeholder="Amount" value={amount}
                onChange={(e) => setAmount(e.target.value)} required
            /><br/><br/>
            <input type="text" placeholder="Description" value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br/><br/>
            <input type="date" placeholder="Date" value={date}
                onChange={(e) => setDate(e.target.value)} required
            /><br/><br/>
            <label>Category: <select onChange={(e) => setCategory(e.target.value)} required>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Household'>Household</option>
                        <option value='Personal Care'>Personal Care</option>
                        <option value='Transportation'>Transportation</option>
                        <option value='Utilities'>Utilities</option>
                        <option value='Other'>Other</option>
                    </select></label><br/><br/>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpense;
