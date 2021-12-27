import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function New_Task() {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState([]);

    const nameChange = name => setName(name.target.value);
    const descChange = desc => setDesc(desc.target.value);
    const deadChange = dead => setDeadline(dead.target.value);
    const tagsChange = tags => setTags(tags.target.value);

    let navigate = useNavigate();

    function submit() {
        if (name.length == 0 || deadline.length == 0) {
            return;
        }
        const url = "/api/v1/tasks/create";
        const token = document.querySelector('meta[name="csrf-token"]').textContent;
        const body = {
            name,
            description,
            deadline,
            tags
        };
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(response => navigate(`/task/${response.id}`))
        .catch(error => console.log(error.message));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                    Create a task.
                    </h1>
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="taskname">Name</label>
                            <input
                            type="text"
                            name="name"
                            id="taskname"
                            className="form-control"
                            required
                            onChange={nameChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskdesc">Description</label>
                            <input
                            type="text"
                            name="description"
                            id="taskdesc"
                            className="form-control"
                            onChange={descChange}
                            />
                            <small id="tip" className="form-text text-muted">
                            Describe the task! Or formulate a plan!
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskdead">Deadline</label>
                            <input
                            type="date"
                            name="deadline"
                            id="taskdead"
                            className="form-control"
                            required
                            onChange={deadChange}
                            />
                        </div>
                        <button type="submit" className="btn custom-button mt-3">
                            Create Task
                        </button>
                        <Link to="/tasks" className="btn mt-3">
                            Back to Tasks
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New_Task;