import React from "react";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useTaskStats } from "@/hooks/useTaskStats";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const stats = useTaskStats();
  const { currentUser } = useAuth();
  
  const priorityData = [
    { name: "High", value: stats.highPriorityCount, color: "#f87171" },
    { name: "Medium", value: stats.mediumPriorityCount, color: "#facc15" },
    { name: "Low", value: stats.lowPriorityCount, color: "#60a5fa" },
  ];
  
  const completionData = [
    { name: "Completed", value: stats.completed, color: "#10b981" },
    { name: "Active", value: stats.active, color: "#6b7280" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Flow Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <CardTitle className="text-sm text-muted-foreground mb-2">Total Tasks</CardTitle>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle className="text-sm text-muted-foreground mb-2">Completed</CardTitle>
            <div className="text-3xl font-bold">{stats.completed}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.completionRate.toFixed(0)}% completion rate
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CardTitle className="text-sm text-muted-foreground mb-2">High Priority</CardTitle>
            <div className="text-3xl font-bold">{stats.highPriorityCount}</div>
          </CardContent>
        </Card>
      </div>
      
      {stats.total > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <CardTitle className="text-sm mb-4">Tasks by Priority</CardTitle>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-4">
            <CardTitle className="text-sm mb-4">Completion Status</CardTitle>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      <TaskFilter />
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
