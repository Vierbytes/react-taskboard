import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Task['status']) => void;
}

function TaskItem({ task, onDelete, onUpdateStatus }: TaskItemProps) {
  return (
    <div className={`task-item ${task.status} ${task.priority}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
      </div>

      <p>{task.description}</p>

      <div className="task-info">
        {/* Convert date string to readable format */}
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="task-actions">
        {/* Dropdown to change task status */}
        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as Task['status'])}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
