import React, { useState } from 'react';

const UpdateExpense = () => {
    const [expenseId, setExpenseId] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        const updatedExpense = { title, amount, description, userId };

        try {
            const response = await fetch(`/expenses/${expenseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Expense updated successfully!');
                setExpenseId('');
                setTitle('');
                setAmount('');
                setDescription('');
            } else {
                alert(result.message || 'Failed to update expense.');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h1>Update Expense</h1><br/>
            <input
                type="text"
                placeholder="Expense ID"
                value={expenseId}
                onChange={(e) => setExpenseId(e.target.value)}
                required
            /><br/><br/>
            <input
                type="text"
                placeholder="New Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br/><br/>
            <input
                type="number"
                placeholder="New Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            /><br/><br/>
            <input
                type="text"
                placeholder="New Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br/><br/>
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default UpdateExpense;
