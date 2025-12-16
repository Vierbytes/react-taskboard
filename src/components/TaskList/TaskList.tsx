import type { Task } from '../../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onUpdateStatus: (id: string, status: Task['status']) => void;
  searchTerm: string;
  filterStatus: string;
  filterPriority: string;
}

function TaskList({ tasks, onDeleteTask, onUpdateStatus, searchTerm, filterStatus, filterPriority }: TaskListProps) {
  // Filter tasks based on search term and filter selections
  const filteredTasks = tasks.filter(task => {
    // Check if task matches search term in title or description
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if task matches status filter
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    // Check if task matches priority filter
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

    // Only include task if it matches all criteria
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Show message if no tasks match the filters
  if (filteredTasks.length === 0) {
    return <p className="empty">No tasks found. Add one to get started!</p>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;
