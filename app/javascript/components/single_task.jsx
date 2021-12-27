import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Single_Task() {
    const [task, setTask] = useState([]);
    const { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        const url = `/api/v1/show/${id}`;
        fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => setTask(response))
        .catch(() => navigate("/"));
    }, []);

    function deleteTask() {
        const url = `/api/v1/destroy/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(() => navigate("/tasks"))
        .catch(error => console.log(error.message));
    }

    let description = task.description;
    const status = task.status ? "Completed" : "Incomplete";
    return (
        <div className="">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
            <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
                {task.name}
            </h1>
            </div>
            <div className="container py-5">
            <div className="row">
                <div className="col-sm-12 col-lg-3">
                <ul className="list-group">
                    <h5 className="mb-2">Description</h5>
                    {description}
                </ul>
                </div>
                <div className="col-sm-12 col-lg-7">
                    <h5 className="mb-2">Deadline</h5>
                    <p>{task.deadline}</p>
                </div>
                <div className="col-sm-12 col-lg-7">
                    <h5 className="mb-2">Status</h5>
                    <p>{status}</p>
                </div>
                <div className="col-sm-12 col-lg-2">
                <button type="button" className="btn btn-danger" onClick={deleteTask}>
                    Delete Task
                </button>
                </div>
            </div>
            <Link to="/tasks" className="btn">
                Back to tasks
            </Link>
            </div>
        </div>
    );
    }

export default Single_Task;