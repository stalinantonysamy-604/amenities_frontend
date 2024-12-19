import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
  };


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      console.log(response.data, "working range calculater");

      console.log(response.data, "range not workind loir")
      const responsetoken = {
        token: response.data.token,
        email: response.data.data.email,
      };

      console.log(responsetoken, 'formateoneout')
      const getStringfyToken = JSON.stringify(responsetoken)
      console.log(getStringfyToken, 'this one find')
      localStorage.setItem("token", getStringfyToken);
      toast.success("Login successful!");

      setTimeout(() => {
        if(responsetoken){
          console.log("vengatesh woking")
        navigate("/amenities")
        }
        else{
          toast.error("user does not exist");
        }

      }, 3000);

      handleClear(); // Clear the form after successful login
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Logout token remove:
  //localStorage.removeItem('token');

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
