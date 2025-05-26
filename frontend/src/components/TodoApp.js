// src/components/TodoApp.js
import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../api/api";
import "../styles/todo.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAdd = async () => {
    if (!text) return;
    await createTask({ title: text });
    setText("");
    getTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    getTasks();
  };

  return (
    <div className="todo-container">
      <h2>My TODO List</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add Task</button>
        <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => handleDelete(t._id)}>
              <span role="img" aria-label="delete">❌</span>
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default TodoApp;
