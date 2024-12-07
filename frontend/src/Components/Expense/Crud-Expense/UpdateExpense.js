import React, { useState, useEffect } from 'react';

const UpdateExpense = ({ selectedExpense, onUpdateExpense }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    // Fetch expense details when component mounts or expenseId changes
    useEffect(() => {
        console.log("Expense id: ",selectedExpense);
        const fetchExpense = async () => {
            try {
                console.log(`Fetching expense with ID: ${selectedExpense}`);
                const response = await fetch(`/expenses/${selectedExpense}`, { method: "GET" });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched expense data:', data);
                    console.log(data.expenses);
    
                    // Update form fields
                    setTitle(data.title);
                    
                    setAmount(data.amount || '');
                    setCategory(data.category || '');
                    setDate(data.date || '');
                    setDescription(data.description || '');
                } else {
                    const error = await response.json();
                    console.error('Failed to fetch expense details:', error);
                }
            } catch (error) {
                console.error('Error fetching expense:', error);
            }
        };
    
        if (selectedExpense){
            fetchExpense();
        }
    }, [selectedExpense]);
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const updatedExpense = { title, amount, category, date, description, userId };

        try {
            const response = await fetch(`/expenses/${selectedExpense}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExpense),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Expense updated successfully!');
                onUpdateExpense(result); // Pass updated expense back to parent
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to update expense.');
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h1>Update Expense</h1>
            <br />
            <p>{title}</p>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
           
            />
            <br />
            <br />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
             
            />
            <br />
            <br />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
         
            />
            <br />
            <br />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
        
            />
            <br />
            <br />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
          
            />
            <br />
            <br />
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default UpdateExpense;
