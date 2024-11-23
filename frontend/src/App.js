import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login/login';
import Register from './pages/auth/Register/register'
import Profile from './pages/profile/profile';
import AddExpense from './pages/AddExpense/AddExpense';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/AddExpense' element={<AddExpense/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
