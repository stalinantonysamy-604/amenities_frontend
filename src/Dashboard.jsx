import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const tokenfromlocalstorage = localStorage.getItem("token");
  

  const tokenStringRemove = JSON.parse(tokenfromlocalstorage);
  console.log(tokenStringRemove, "working largestman");

  const HandleRemove =() => {
    localStorage.removeItem("token");

  }

  return <div>
    <div>my Profile</div>
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div>
        <img
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
      <div>{tokenStringRemove.email}</div>
    </div>
    <Link to="/login">
    <div style={{cursor: "pointer"}} onClick={HandleRemove}>
        Logout
    </div>
    </Link>
  </div>;
};

export default Dashboard;
