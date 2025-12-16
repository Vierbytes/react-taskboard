// Main task interface that defines the structure of a task object
export interface Task {
  id: string;                                          // Unique identifier for the task
  title: string;                                       // Short title of the task
  description: string;                                 // Detailed description
  status: 'pending' | 'in-progress' | 'completed';    // Current status (only these 3 values allowed)
  priority: 'low' | 'medium' | 'high';                // Priority level (only these 3 values allowed)
  dueDate: string;                                     // Due date in string format (from date input)
}
