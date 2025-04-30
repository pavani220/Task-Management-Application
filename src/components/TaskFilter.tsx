
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const TaskFilter = () => {
  const { filter, setFilter } = useTask();
  const { logout } = useAuth();

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ] as const;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold">My Tasks</h2>
      
      <div className="flex gap-2">
        <div className="bg-muted rounded-lg p-1 flex">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className={
                filter === option.value 
                  ? "bg-white shadow-sm dark:bg-slate-800" 
                  : ""
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
        
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TaskFilter;
