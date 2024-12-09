import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login/login';
import Register from './Components/Auth/Register/register';
import Profile from './Components/Profile/profile';
import Expense from './Components/Expense/Expense';
import Budget from './Components/Budget/Budget';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound';
import Unauthorized from './Components/Unauthorized';
import RouteGuard from './Components/RouteGuard';
import NavBarComponent from './Components/Navbar/navbar';

function App() {

  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/home' element={<RouteGuard><Home /></RouteGuard>} />
          <Route path='/expense' element={<RouteGuard><Expense /></RouteGuard>} />
          <Route path='/budget' element={<RouteGuard><Budget /></RouteGuard>} />
          <Route path='/profile' element={<RouteGuard><Profile /></RouteGuard>} />
          <Route path='/navbar' element={<RouteGuard><NavBarComponent /></RouteGuard>} />
          <Route path="*" element={ <RouteGuard> <NotFound /> </RouteGuard>}/>
          
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
};


export default App;
