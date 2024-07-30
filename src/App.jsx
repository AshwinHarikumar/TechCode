import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import About from './components/About';
import Programs from './components/Programs';
import Notes from './components/Notes';
import Books from './components/Books';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SigninForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs/>} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/books" element={<Books/>} />
      </Routes>
    </Router>
  );
};

export default App;
