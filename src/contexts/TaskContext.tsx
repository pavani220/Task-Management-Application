import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { db } from "@/firebase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  user_id: string;
  created_at: number;
  priority: "low" | "medium" | "high";
}

interface TaskContextProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  addTask: (title: string, description: string, priority: "low" | "medium" | "high") => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  filter: "all" | "active" | "completed";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "active" | "completed">>;
  filteredTasks: Task[];
  updateTask: (id: string, updates: Partial<Omit<Task, "id" | "user_id">>) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    if (!currentUser) return [];

    const tasksCollection = collection(db, "tasks");
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];

    return taskList.filter(task => task.user_id === currentUser.uid);
  };

  // Use React Query to manage tasks state
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", currentUser?.uid],
    queryFn: fetchTasks,
    enabled: !!currentUser,
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (task: {
      title: string;
      description: string;
      priority: "low" | "medium" | "high";
    }) => {
      if (!currentUser) throw new Error("User not authenticated");

      const newTask = {
        ...task,
        status: "pending",
        creationDate: new Date().toISOString(),
        userId: currentUser.uid,
      };

      const tasksCollection = collection(db, "tasks");
      await addDoc(tasksCollection, newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", currentUser?.uid] });
      toast.success("Task added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add task: ${error.message}`);
    },
  });

  // Toggle task completion mutation
  const toggleTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) throw new Error("Task not found");

      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { completed: !taskToUpdate.completed });

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", currentUser?.uid] });
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });

  
  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", currentUser?.uid] });
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Omit<Task, "id" | "user_id">> }) => {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, updates);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", currentUser?.uid] });
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update task: ${error.message}`);
    },
  });

  // Add a new task
  const addTask = (title: string, description: string, priority: "low" | "medium" | "high") => {
    addTaskMutation.mutate({ title, description, priority });
  };

  // Toggle a task's completion status
  const toggleTaskCompletion = (id: string) => {
    toggleTaskMutation.mutate(id);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  // Update a task
  const updateTask = (id: string, updates: Partial<Omit<Task, "id" | "user_id">>) => {
    updateTaskMutation.mutate({ id, updates });
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const value = {
    tasks,
    isLoading,
    error,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    filter,
    setFilter,
    filteredTasks,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
