import React, { useState } from 'react';

const AddBudget = () =>{
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
            if (response.ok) {
                alert('Budget added successfully!');
                setAmount('');
                setStartDate('');
                setEndDate('');
            } else {
                alert(result.message || 'Failed to add budget.');
            }
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder='Budget Amount' value={amount}
                    onChange={(e) => setAmount(e.target.value)} required
                /><br/><br/>
                <label>Start Date: <input type='date' placeholder='Start Date' value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} required
                /></label>
                <br/><br/>
                <label>End Date: <input type='date' placeholder='End Date' value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} required
                /></label>
                <br/><br/>
                <button type='submit'>Add Budget</button>
            </form>
        </div>
    );
};

export default AddBudget;