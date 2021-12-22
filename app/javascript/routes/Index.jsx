import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/All_Tasks";
import Task from "../components/single_task";
import Create_Task from "../components/Create_Task";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/task/:id" element={<Task />} />
      <Route path="/createTask" element={<Create_Task />} />
    </Routes>
  </BrowserRouter>
);
