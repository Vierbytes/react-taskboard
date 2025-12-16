import { useState } from 'react';
import type { Task } from '../../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  // Separate state for each form field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('pending');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors: string[] = [];
    if (title.trim().length < 3) {
      newErrors.push('Title must be at least 3 characters');
    }
    if (description.trim().length < 10) {
      newErrors.push('Description must be at least 10 characters');
    }
    if (!dueDate) {
      newErrors.push('Due date is required');
    }

    // If there are errors, show them and don't submit
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new task object with a unique id
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
      priority,
      dueDate
    };

    // Send task to parent component
    onAddTask(newTask);

    // Clear form after successful submission
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('medium');
    setDueDate('');
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Add New Task</h2>

      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
        </div>
      )}

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
