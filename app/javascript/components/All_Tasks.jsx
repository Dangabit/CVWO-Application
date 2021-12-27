import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setTasks(response))
      .catch(() => navigate("/"));
  }, []);

  const allTasks = tasks.map((task, index) => (
    <div key={index} className="col-md-12 col-lg-12">
      <div className="card my-4 card-custom">
        <div className="card-body">
          <h3 className="card-title">{task.name}</h3>
          <div className="d-flex justify-content-between">
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status ? "Complete" : "Incomplete"}</p>
          </div>
          <Link to={`/task/${task.id}`} className="btn">
            Open Task
          </Link>
        </div>
      </div>
    </div>
  ));
  const noTask = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center flex-column">
      <h4>
        There are no tasks!
      </h4>
    </div>
  );

  return(
    <div className="back-custom vh-100">
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Mega Task List</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-4">
            <Link to="/createTask" className="btn">
              Create Task
            </Link>
          </div>
          <div className="row">
            {tasks.length > 0 ? allTasks : noTask}
          </div>
          <Link to="/" className="btn mt-4">
            Home
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Tasks;
