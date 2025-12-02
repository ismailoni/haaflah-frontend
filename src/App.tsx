import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import SigninPage from "./pages/SignInPage";
import SignupPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import CreateEvent from './pages/CreateEvent';
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuth } from "./hooks/useAuth";
import ManageEvent from "./pages/ManageEventPage";
import DocLayout from "./pages/docs/DocLayout";

// Documentation Pages - Contributor Focused
import DocsHome from "./pages/docs/pages/DocsHome";
import Introduction from "./pages/docs/pages/Introduction";
import Installation from "./pages/docs/pages/Installation";
import QuickStart from "./pages/docs/pages/QuickStart";
import Authentication from "./pages/docs/pages/Authentication";
import Events from "./pages/docs/pages/Events";
import Participants from "./pages/docs/pages/Participants";
import Statistics from "./pages/docs/pages/Statistics";
import ProjectStructure from "./pages/docs/pages/ProjectStructure";
// import CodeStyle from "./pages/docs/pages/CodeStyle";
import FAQ from "./pages/docs/pages/FAQ";


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

      <Route path="/doc" element={<DocLayout />}>
        <Route index element={<DocsHome />} />
        {/* Getting Started */}
        <Route path="getting-started/introduction" element={<Introduction />} />
        <Route path="getting-started/installation" element={<Installation />} />
        <Route path="getting-started/quick-start" element={<QuickStart />} />
        {/* API Reference */}
        <Route path="api/authentication" element={<Authentication />} />
        <Route path="api/events" element={<Events />} />
        <Route path="api/participants" element={<Participants />} />
        <Route path="api/statistics" element={<Statistics />} />
        {/* Development */}
        <Route path="development/structure" element={<ProjectStructure />} />
        <Route path="development/testing" element={<FAQ />} />
        <Route path="development/build" element={<FAQ />} />
        {/* Contributing */}
        <Route path="contributing/pr-process" element={<FAQ />} />
        <Route path="contributing/commit" element={<FAQ />} />
        {/* Resources */}
        <Route path="resources/faq" element={<FAQ />} />
      </Route>
      
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
