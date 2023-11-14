// import logo from './logo.svg';
import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AccountDetail from './components/AccountDetail'
import Support from './components/SupportDetail';
import {
  BrowserRouter as Router,
  Routes,
  Route, useParams,
} from "react-router-dom"

function App() {
  return (
    <Router>
      {/* <NavBar1/> */}
      <Routes>Home
        <Route path="/signin" element={<LoginForm />}> </Route>
        <Route path="/registration" element={<RegistrationForm />}></Route>
        <Route path="/account" element={<AccountDetail />}></Route>
        <Route path="/support" element={<Support />}></Route>
      </Routes>
      {/* <Footer1/> */}
    </Router>


  );
}

export default App;
