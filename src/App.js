
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavAuth from './Components/NavAuth';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Profil from './Components/Profil';
import PrivateRoute from './Components/PrivateRoute';
import EditUser from './Components/EditUser'
import Users from './Components/Users';
import ListProduct from './Components/ListProduct';
import ListCommandes from './Components/ListCommandes';
import ListShopping from './Components/ListShopping';
import DescProduct from './Components/DescProduct';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <NavAuth />
      

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Profil' element={<PrivateRoute><Profil/></PrivateRoute>}/>
        <Route path='/EditUser' element={<EditUser/>} />
        <Route path='/Users' element={<Users/>} />
        <Route path='/ListProduct' element={<ListProduct/>} />
        <Route path='/ListCommandes' element={<ListCommandes/>} />
        <Route path='/ListShopping' element={<ListShopping/>} />
        <Route path='/DescProduct/:id' element={<DescProduct/>} />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />
    </div>
  );
}

export default App;
