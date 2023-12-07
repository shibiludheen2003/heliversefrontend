import React from 'react';
import LoginPage  from './pages/loginPage';
import Users from "../src/pages/users.jsx"
import CreateUser from "../src/pages/createUser.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditUser from './pages/editUser.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users/>} />
        <Route path ="/add-user" element={<CreateUser/>}/>
        <Route path='/edit-user/:id' element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
