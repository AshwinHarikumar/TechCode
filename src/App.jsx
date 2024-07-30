import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import About from './components/About';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SigninForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
