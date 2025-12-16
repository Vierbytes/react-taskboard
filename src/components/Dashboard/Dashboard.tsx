import { useState, useEffect } from 'react';
import type { Task } from '../../types';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';
import TaskFilter from '../TaskFilter/TaskFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  // Load tasks from localStorage on initial render
  // Using a function inside useState so it only runs once
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the tasks array
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // Remove task by id with confirmation
  const deleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Update the status of a specific task
  // Using map to create a new array with the updated task
  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status } : task
    ));
  };

  // Calculate statistics by counting tasks in each status
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="container">
        <header>
          <h1>Task Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </header>

        <div className="stats">
          <div className="stat-box">
            <h3>Total</h3>
            <p>{totalTasks}</p>
          </div>
          <div className="stat-box">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="stat-box">
            <h3>In Progress</h3>
            <p>{inProgressTasks}</p>
          </div>
          <div className="stat-box">
            <h3>Pending</h3>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <div className="main-content">
          <div className="sidebar">
            <TaskForm onAddTask={addTask} />
          </div>

          <div className="tasks-section">
            <TaskFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onStatusChange={setFilterStatus}
              filterPriority={filterPriority}
              onPriorityChange={setFilterPriority}
            />

            <TaskList
              tasks={tasks}
              onDeleteTask={deleteTask}
              onUpdateStatus={updateStatus}
              searchTerm={searchTerm}
              filterStatus={filterStatus}
              filterPriority={filterPriority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
