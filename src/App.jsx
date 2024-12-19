import React, { useState } from 'react';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MyAmenities from './pages/amenities';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import List from './components/amenities/List';




const App = () => {
  const [amenities, setAmenities] = useState([]);

  const handleAddAmenity = (newAmenity) => {
    setAmenities([...amenities, newAmenity]);
  };

  return (
    <>
    <BrowserRouter>
    <Provider store={store}>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">AuthApp</Link>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

            </ul>
          </div>
        </nav>

     <Routes>
     <Route path="/amenities" element={<MyAmenities />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </Provider>
    
    </BrowserRouter>

    <List />
    </>
  );
};

export default App;
