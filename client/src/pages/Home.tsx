import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to order management 📦</h1>
      <div>
        <Link to="/orders">Click here</Link> to view the order page
      </div>
    </div>
  );
};

export default Home;
