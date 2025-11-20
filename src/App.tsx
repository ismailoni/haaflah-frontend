import { Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import SigninPage from "./pages/SignInPage";
import SignupPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import CreateEvent from './pages/CreateEvent'
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuth } from "./hooks/useAuth";
import ManageEvent from "./pages/ManageEventPage";


function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/sign-in" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SigninPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/register/:eventId"
        element={
            <RegistrationPage />
        }
      />
      <Route
        path="/dashboard/create-event"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />

      <Route path="/dashboard/manage-event/:id"
        element={
          <PrivateRoute>
            <ManageEvent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
