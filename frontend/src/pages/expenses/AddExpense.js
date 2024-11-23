import React, { useState } from 'react';

const AddExpense = () =>{
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(' ');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
      
        const data = {
          title,
          amount,
          description,
          date,
          category,
        };
      
        try {
          const response = await fetch('/expenses', {
            method: 'POST', // Specify the HTTP method
            headers: {
              'Content-Type': 'application/json', // Indicate JSON payload
            },
            body: JSON.stringify(data), // Convert `data` object to a JSON string
          });
      
          const result = await response.json(); // Parse the JSON response
          if (response.ok) {
            console.log('Expense added:', result);
            alert('Expense added successfully!');
            window.location.href = '/'; // Redirect after successful submission
          } else {
            alert(result.message || 'Failed to add expense.');
          }
        } catch (error) {
          console.error('Error adding expense:', error);
          alert('An error occurred while adding the expense. Please try again.');
        }
      };
      

    return(
        <div>
            
            <form onSubmit={handleSubmit}> 
                <h1>Add Expense</h1>
                <div>
                    <label>Name of Expense: <input type='text' id='title' onChange={(e) => setTitle(e.target.value)} required/> <br/><br/></label>
                    
                    <label>Amount: <input type='number' id='amount' step=".01" onChange={(e) => setAmount(e.target.value)} required/><br/><br/></label>
                    
                    <label>Description: <input type='text' id='description' onChange={(e) => setDescription(e.target.value)}/> <br/><br/></label>

                    <label>Date: <input type='date' id='date' onChange={(e) => setDate(e.target.value)} required/><br/><br/></label>

                    <label>Category: <select id='categories' onChange={(e) => setCategory(e.target.value)} required>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Household'>Household</option>
                        <option value='Personal Care'>Personal Care</option>
                        <option value='Transportation'>Transportation</option>
                        <option value='Utilities'>Utilities</option>
                    </select><br/><br/></label>

                    <button type='submit'>Add Expense</button>
                </div>
            </form>
        </div>
    );

}

export default AddExpense;