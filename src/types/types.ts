import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AuthType = {
  isLoggedIn: boolean;
  email: string | null;
};

export type AuthContextType = AuthType & {
  setAuth: (auth: AuthType) => void;
};

export type ExerciseType = {
  id: number;
  exerciseName: string;
};

export type PaginatedItemsType<T> = {
  items: T[];
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type TrainingPlanType = {
  id: number;
  trainingPlanName: string;
  exercises: ExerciseType[];
};

export type ExerciseSetType = {
  id: number;
  repetitions: number;
  weight: number;
};

export type WorkoutSessionExerciseSetType = {
  id: number;
  exerciseName: string;
  sets: ExerciseSetType[];
};

export type WorkoutSessionExerciseType = {
  id: number;
  exercise: WorkoutSessionExerciseSetType;
};

export type WorkoutSessionTrainingPlanType = {
  id: number;
  trainingPlanName: string;
  workoutSessionExercises: WorkoutSessionExerciseType[];
};

export type WorkoutSessionType = {
  id: number;
  date: Date;
  trainingPlan: WorkoutSessionTrainingPlanType;
};

export enum ModalMode {
  Create = "CREATE",
  Edit = "Edit",
}
