import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import ExercisesPage from "@/pages/Exercises";
import TrainingPlansPage from "@/pages/TrainingPlans";
import WorkoutSessionsPage from "@/pages/WorkoutSessions";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<ProtectedRoute />}>
        <Route element={<ExercisesPage />} path="/exercises" />
        <Route element={<TrainingPlansPage />} path="/training-plans" />
        <Route element={<WorkoutSessionsPage />} path="/workout-sessions" />
      </Route>
    </Routes>
  );
}

export default App;
