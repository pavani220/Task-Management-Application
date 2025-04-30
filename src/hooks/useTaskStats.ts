
import { useTask } from "@/contexts/TaskContext";

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
}

export const useTaskStats = (): TaskStats => {
  const { tasks } = useTask();
  
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  
  // Calculate completion rate (as percentage)
  const completionRate = total > 0 ? (completed / total) * 100 : 0;
  
  // Count tasks by priority
  const highPriorityCount = tasks.filter(task => task.priority === "high").length;
  const mediumPriorityCount = tasks.filter(task => task.priority === "medium").length;
  const lowPriorityCount = tasks.filter(task => task.priority === "low").length;
  
  return {
    total,
    completed,
    active,
    completionRate,
    highPriorityCount,
    mediumPriorityCount,
    lowPriorityCount
  };
};
