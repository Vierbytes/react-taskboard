interface TaskFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
  filterPriority: string;
  onPriorityChange: (value: string) => void;
}

function TaskFilter({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterPriority,
  onPriorityChange
}: TaskFilterProps) {
  return (
    <div className="task-filter">
      {/* Search input for filtering by text */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      {/* Filter by status dropdown */}
      <select
        value={filterStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Filter by priority dropdown */}
      <select
        value={filterPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default TaskFilter;
