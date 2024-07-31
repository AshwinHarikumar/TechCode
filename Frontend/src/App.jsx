import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import About from './components/About';
import Programs from './components/Programs';
import Notes from './components/Notes';
import Books from './components/Books';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile';
import ManageUsers from './components/Admin/ManageUsers';
import ManageBooks from './components/Admin/ManageBook';


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
        <Route path="/admin" element={<Admin/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/manage-users" element={<ManageUsers/>} />
        <Route path="/manage-books" element={<ManageBooks/>} />

    

      </Routes>
    </Router>
  );
};

export default App;
