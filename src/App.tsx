import { Route, Routes } from "react-router-dom";
import { useLocale } from "@react-aria/i18n";
import { Toaster } from "sonner";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

import IndexPage from "@/pages/Index";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import ExercisesPage from "@/pages/Exercises";
import TrainingPlansPage from "@/pages/TrainingPlans";
import WorkoutSessionsPage from "@/pages/WorkoutSessions";
import TrainingPlanPage from "@/pages/TrainingPlan";
import WorkoutSessionPage from "@/pages/WorkoutSession";

function App() {
  const { locale, direction } = useLocale();
  return (
    <div lang={locale} dir={direction}>
      <Toaster richColors />
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<ExercisesPage />} path="/exercises" />
          <Route element={<TrainingPlansPage />} path="/training-plans" />
          <Route element={<TrainingPlanPage />} path="/training-plans/:id" />
          <Route element={<WorkoutSessionsPage />} path="/workout-sessions" />
          <Route
            element={<WorkoutSessionPage />}
            path="/workout-sessions/:id"
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
