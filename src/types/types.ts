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
};

export type TrainingPlanExercisesType = TrainingPlanType & {
  exercises: ExerciseType[];
};

export type ExerciseSetType = {
  id: number;
  repetitions: number;
  weight: number;
};

export type WorkoutSessionExerciseSetsType = {
  id: number;
  exerciseName: string;
  sets: ExerciseSetType[];
};

export type WorkoutSessionExerciseSetType = {
  id: number;
  exercise: WorkoutSessionExerciseSetsType;
};

export type WorkoutSessionTrainingPlanType = {
  id: number;
  trainingPlanName: string;
  workoutSessionExercises: WorkoutSessionExerciseSetType[];
};

export type WorkoutSessionType = {
  id: number;
  date: Date;
  trainingPlan: TrainingPlanType;
};

export type WorkoutSessionExercisesType = {
  id: number;
  date: Date;
  trainingPlan: WorkoutSessionTrainingPlanType;
};

export enum ModalMode {
  Create = "CREATE",
  Edit = "Edit",
}

export type SetSelectedTabProps = React.Dispatch<
  React.SetStateAction<string | number>
>;
