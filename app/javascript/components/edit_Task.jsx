import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function editTask() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState([]);
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
        .then(response => {
            setName(response.name);
            setDesc(response.description);
            setDeadline(response.deadline);
        })
        .catch(() => navigate("/"));
    }, []);

    const nameChange = name => setName(name.target.value);
    const descChange = desc => setDesc(desc.target.value);
    const deadChange = dead => setDeadline(dead.target.value);
    const tagsChange = tags => setTags(tags.target.value);

    function submit(e) {
        e.preventDefault();
        if (name.length == 0 || deadline.length == 0) {
            return;
        }
        const url = `/api/v1/update/${id}`;
        const token = document.querySelector('meta[name="csrf-token"]').textContent;
        const body = {
            name,
            description,
            deadline,
            tags
        };
        fetch(url, {
            method: "PATCH",
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
        <div className="back-custom vh-100">
            <div className="col-sm-12 col-lg-6 offset-lg-3 py-5">
                <h1 className="font-weight-normal mb-5">
                Editting: {name}
                </h1>
                <form onSubmit={(e) => submit(e)}>
                    <div className="form-group">
                        <label htmlFor="taskname">Name</label>
                        <input
                        type="text"
                        name="name"
                        id="taskname"
                        className="form-control"
                        onChange={nameChange}
                        value={name}
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
                        value={description}
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
                        onChange={deadChange}
                        value={deadline}
                        />
                    </div>
                    <button type="submit" className="btn custom-button mt-3">
                        Edit Task
                    </button>
                    <Link to={`/task/${id}`} className="btn mt-3 mx-3">
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default editTask;