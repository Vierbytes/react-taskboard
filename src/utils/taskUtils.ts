import type { Task } from '../types';

// Generate a unique ID using timestamp and random number
// This creates IDs like "l5xk7m3p9q" that are unlikely to collide
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Check if a task has valid data
// Returns an array of error messages (empty if valid)
export function validateTask(task: Partial<Task>): string[] {
  const errors: string[] = [];

  if (!task.title || task.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!task.description || task.description.trim().length < 5) {
    errors.push('Description must be at least 5 characters');
  }

  if (!task.dueDate) {
    errors.push('Due date is required');
  }

  return errors;
}

// Save tasks array to localStorage
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
// Returns empty array if nothing is saved
export function loadTasks(): Task[] {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
}
