import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login/login';
import Register from './Components/Auth/Register/register';
import Profile from './Components/Profile/profile';
import Expense from './Components/Expense/Expense';
import Home from './Components/Home/Home';
import NavBarComponent from './Components/Navbar/Navbar';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/navbar' element={<NavBarComponent />} />
        </Routes>
      </Router>
    </div>
  );
};


export default App;
