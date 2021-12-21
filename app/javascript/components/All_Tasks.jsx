import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setTasks(response));
  }, []);

  const allTasks = tasks.map((task, index) => (
    <div key={index} className="col-md-12 col-lg-12">
      <div className="card my-4">
        <div className="card-body">
          <h5 className="card-title">{task.name}</h5>
          <p>{task.deadline}</p>
          <Link to={'/task/${task.id}'} className="btn">
            Open Task
          </Link>
        </div>
      </div>
    </div>
  ));
  const noTask = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        There are no tasks!
      </h4>
      <Link to="/new_recipe" className="btn">Create one!</Link>   
    </div>
  );

  return(
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Mega Task List</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/" className="btn">
              Create New Recipe
            </Link>
          </div>
          <div className="row">
            {tasks.length > 0 ? allTasks : noTask}
          </div>
          <Link to="/" className="btn">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}

export default Tasks;
