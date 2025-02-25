import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocale } from "@react-aria/i18n";
import { Toaster } from "sonner";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

import IndexPage from "@/pages/Index";
import AuthPage from "@/pages/Auth";
import ExercisesPage from "@/pages/Exercises";
import TrainingPlansPage from "@/pages/TrainingPlans";
import WorkoutSessionsPage from "@/pages/WorkoutSessions";
import TrainingPlanPage from "@/pages/TrainingPlan";
import WorkoutSessionPage from "@/pages/WorkoutSession";

import { setupAuthAxiosInterceptors } from "@/api/http";
import useTheme from "@/hooks/useTheme";
import useAuth from "./hooks/useAuth";

function App() {
  const { locale, direction } = useLocale();
  const nagivate = useNavigate();
  const { theme } = useTheme();
  const { setAuth } = useAuth();

  useEffect(() => {
    setupAuthAxiosInterceptors(nagivate, setAuth);
  }, [nagivate, setAuth]);

  return (
    <div lang={locale} dir={direction}>
      <Toaster richColors theme={theme} closeButton />
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<AuthPage />} path="/auth" />
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
