import React, { useState } from 'react';
import './styles/todo.css';
import './index.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleDelete = (indexToDelete) => {
    const newTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);
  };

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    padding: '20px',
  };

  return (
    <div style={backgroundStyle}>
      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="input-row">
        <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd();
        }}
      />
  <button onClick={handleAdd}>Add</button>
  <span className="status-text">
  <span role="img" aria-label="memo">📝</span> {tasks.length} task{tasks.length !== 1 && 's'}
 </span>

</div>

        <ul>
          {tasks.map((t, index) => (
            <li key={index}>
              {t}
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

