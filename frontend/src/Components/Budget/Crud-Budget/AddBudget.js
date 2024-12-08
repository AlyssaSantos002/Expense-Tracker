import React, { useState } from 'react';

const AddBudget = ({onAddBudget}) =>{
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        const newBudget = {userId, amount, startDate, endDate};

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
                setStartDate('');
                setEndDate('');
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
                <h1>Add Budget</h1><br/>
                <input type='number' placeholder='Budget Amount' value={amount} min="0"
                    onChange={(e) => setAmount(e.target.value)} required
                /><br/>
                <label>Start Date: <input type='date' placeholder='Start Date' value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} required
                /></label>
                <br/>
                <label>End Date: <input type='date' placeholder='End Date' value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} required
                /></label>
                <br/>
                <button type='submit'>Add Budget</button>
            </form>
        </div>
    );
};

export default AddBudget;