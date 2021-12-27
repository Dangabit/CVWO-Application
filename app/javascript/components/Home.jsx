import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
  <div className="back-custom flex-column justify-content-center d-flex align-items-center vw-100 vh-100">
    <h1>Task Master v0.1</h1>
    <p>A webapp to deal with your procrastination!</p>
    <Link
      to="/tasks"
      className="btn"
      role="button"
    >Let's go!</Link>
  </div>
  );
}

export default Home;
