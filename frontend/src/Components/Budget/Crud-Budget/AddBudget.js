import React, { useState } from 'react';

const AddBudget = ({onAddBudget}) =>{
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        const newBudget = {userId, amount};

        try {
            const response = await fetch('/budget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBudget),
            });

            const result = await response.json();
            console.log({result});
            if (response.ok) {
                alert('Budget added successfully!');
                setAmount('');
                onAddBudget(result.budget);
            } else {
                alert(result.message || 'Failed to add budget.');
            }
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    
    return(
        <div>
            <form onSubmit={handleSubmit} className='add-budget-form'>
                <h1>Update Budget</h1><br/>
                <input type='number' placeholder='Budget Amount' value={amount} min="0"
                    onChange={(e) => setAmount(e.target.value)} required
                /><br/>
                <br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default AddBudget;