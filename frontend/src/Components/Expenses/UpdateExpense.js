import React, { useState, useEffect } from 'react';
import moment from 'moment';

const UpdateExpense = ({ selectedExpense, onUpdateExpense }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [formattedDate, setDateFormat] = useState('');
    //Stores the previously selected catgory and act as a placeholder
    const [prevCategory, setPrevCategory] = useState('');

    // Fetch expense details when component mounts or expenseId changes
    useEffect(() => {
        console.log("Expense id: ", selectedExpense);
        const fetchExpense = async () => {
            try {
                console.log(`Fetching expense with ID: ${selectedExpense}`);
                const response = await fetch(`/expenses/${selectedExpense}`, { method: "GET" });
                const data = await response.json();
                console.log('Fetched expense data:', data);
                // Update form fields
                setTitle(data.expense.title);
                setAmount(data.expense.amount);
                setCategory(data.expense.category);
                setDate(data.expense.date);
                setDateFormat(moment(data.expense.date).format("yyyy-MM-DD"));
                setDescription(data.expense.description);
                setPrevCategory(data.expense.category);

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
        const userId = localStorage.getItem('userId');
        const updatedExpense = { title, amount, category, date, description, userId};

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
            <input
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}

            />
            <br />
            <br />
            <input
                type="number"
                placeholder={amount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}

            />
            <br />
            <br />
            {/* <input
                type="text"
                placeholder={category}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
         
            /> */}
            <label>Category: <select onChange={(e) => setCategory(e.target.value)} defaultValue={prevCategory}>
                <option selected="selected">{prevCategory}</option>
                <option value="Housing">Housing</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
            </select></label>
            <br />
            <br />
            <p>{formattedDate}</p><br/>
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
