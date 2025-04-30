import React from "react";
import { Task, useTask } from "@/contexts/TaskContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Check, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800"
};

const TaskItem = ({ task }: { task: Task }) => {
  const { toggleTaskCompletion, deleteTask } = useTask();

  return (
    <div className="flex flex-col p-4 border mb-3 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)} 
            id={`task-${task.id}`}
            className="h-5 w-5"
          />
          <label 
            htmlFor={`task-${task.id}`}
            className={`flex-1 font-medium cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </label>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteTask(task.id)}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {task.description && (
        <div className={`ml-8 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </div>
      )}
      
      <div className="ml-8 mt-2 text-xs text-gray-400">
        Created {formatDistanceToNow(task.created_at, { addSuffix: true })}
      </div>
    </div>
  );
};

const TaskList = () => {
  const { filteredTasks, isLoading, error } = useTask();

  if (isLoading) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
        <h3 className="font-medium text-lg mb-2">Loading tasks...</h3>
        <p className="text-muted-foreground">
          Please wait while we retrieve your tasks
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-dashed border-red-200">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="font-medium text-lg mb-2">Error loading tasks</h3>
        <p className="text-red-600">
          {error.message}
        </p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Check className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          Add a new task to get started with your day!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
