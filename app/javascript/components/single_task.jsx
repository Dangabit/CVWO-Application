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

    const status = task.status ? "Completed" : "Incomplete";
    return (
        <div className="back-custom vh-100">
            <div className="hero position-relative d-flex align-items-center justify-content-center">
                <h1 className="display-4 position-relative mt-5">
                    {task.name}
                </h1>
            </div>
            <div className="container py-5 d-flex flex-column">
                <div className="row d-flex">
                    <div className="col-sm-8 col-lg-8">
                        <h5 className="mb-2">Description</h5>
                        {task.description}
                    </div>
                    <div className="col-sm-4 col-lg-4 ms-auto">
                        <h5 className="mb-2">Deadline</h5>
                        <p>{task.deadline}</p>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-7">
                    <h5 className="mb-2">Status</h5>
                    <p>{status}</p>
                </div>
                <div className="d-flex">
                    <Link to="/tasks" className="btn">
                        Back to tasks
                    </Link>
                    <Link to={`/editTask/${id}`} className="btn mx-3">
                        Edit Task
                    </Link>
                    <button type="button" className="btn btn-danger text-black ms-auto" onClick={deleteTask}>
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Single_Task;