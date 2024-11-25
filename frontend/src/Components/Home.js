import React from 'react';
import AddExpense from './Expenses/AddExpense';
import ExpensesList from './Expenses/ExpensesList';
// import UpdateExpense from './Expenses/UpdateExpense';

const Home = () => {
    return (
        <div className='home'>
            <div className='home-item'><AddExpense /></div>            
            <div className='home-item'><ExpensesList /></div>
        </div>
    );
};

export default Home;
