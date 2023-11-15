// import logo from './logo.svg';
import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import AccountDetail from './components/AccountDetail';
import SupportDetail from './components/SupportDetail';
import Notifications from './components/Notifications';
import Home from './components/Home';
import Notifications from './components/Notification';


import {
  BrowserRouter as Router,
  Routes,
  Route, useParams,
} from "react-router-dom"

function App() {
  return (
    <Router>

      <Routes>Home
       <Route path="/signin"  element = {<LoginForm/>}> </Route>
      <Route path ="/registration" element ={<RegistrationForm/>}></Route>
      <Route path ="/dashboard" element ={<Dashboard/>}></Route>
      <Route path ="/search" element ={<Search/>}></Route>
      <Route path ="/account" element ={<AccountDetail/>}></Route>
      <Route path ="/support" element ={<SupportDetail/>}></Route>
      <Route path ="/notification" element ={<Notifications/>}></Route>
      <Route path ="/home" element ={<Home/>}></Route>
  );
}

export default App;
