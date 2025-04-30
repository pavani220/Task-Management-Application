
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Flow Task Manager</h1>
          <p className="text-muted-foreground">
            {currentUser 
              ? "Manage your tasks efficiently" 
              : "Log in to start managing your tasks"}
          </p>
        </header>

        {currentUser ? <Dashboard /> : <AuthForm />}
      </div>
    </div>
  );
};

export default Index;
