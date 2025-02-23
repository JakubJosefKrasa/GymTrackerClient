import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { BASE_URL, authAxios, queryClient } from "@/api/http";

import { QUERY_KEYS } from "@/api/queryKeys";
import { ExerciseSetFormSchemaType } from "@/types/schemas";
import { WorkoutSessionExercisesType, WorkoutSessionType } from "@/types/types";

const WORKOUT_SESSIONS_URL = BASE_URL + "workout-sessions";

async function getWorkoutSessions() {
  const response =
    await authAxios.get<WorkoutSessionType[]>(WORKOUT_SESSIONS_URL);

  return response.data;
}

async function getWorkoutSessionById(id: number) {
  const response = await authAxios.get<WorkoutSessionExercisesType>(
    `${WORKOUT_SESSIONS_URL}/${id}`
  );

  return response.data;
}

type CreateWorkoutSessionProps = {
  date: Date;
  trainingPlanId: number;
};

async function createWorkoutSession({
  date,
  trainingPlanId,
}: CreateWorkoutSessionProps) {
  const promise = authAxios.post<WorkoutSessionExercisesType>(
    WORKOUT_SESSIONS_URL,
    {
      date,
      trainingPlanId,
    }
  );

  toast.promise(promise, {
    loading: `Trénink se ukládá`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutSessions],
      });
      return `Trénink byl úspěšně vytvořen`;
    },
    error: `Trénink se nepodařilo vytvořit`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

async function deleteWorkoutSession(id: number) {
  const promise = authAxios.delete<void>(`${WORKOUT_SESSIONS_URL}/${id}`);

  toast.promise(promise, {
    loading: `Trénink se maže`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutSessions],
      });
      return `Trénink byl úspěšně smazán`;
    },
    error: `Trénink se nepodařilo smazat`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

type WorkoutSessionIds = {
  workoutSessionId: number;
  workoutSessionExerciseId: number;
};

type ExerciseSetProps = ExerciseSetFormSchemaType & WorkoutSessionIds;

async function createExerciseSet({
  workoutSessionId,
  workoutSessionExerciseId,
  repetitions,
  weight,
}: ExerciseSetProps) {
  const promise = authAxios.post<WorkoutSessionExercisesType>(
    `${WORKOUT_SESSIONS_URL}/${workoutSessionId}/workout-session-exercises/${workoutSessionExerciseId}/workout-session-exercise-sets`,
    {
      repetitions,
      weight,
    }
  );

  toast.promise(promise, {
    loading: `Série se vytváří`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutSessions],
      });
      return `Série byla úspěšně vytvořena`;
    },
    error: `Sérii se nepodařilo vytvořit`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

async function deleteExerciseSet({
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
}: WorkoutSessionIds & {
  workoutSessionExerciseSetId: number;
}) {
  const promise = authAxios.delete<WorkoutSessionExercisesType>(
    `${WORKOUT_SESSIONS_URL}/${workoutSessionId}/workout-session-exercises/${workoutSessionExerciseId}/workout-session-exercise-sets/${workoutSessionExerciseSetId}`
  );

  toast.promise(promise, {
    loading: `Série se maže`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutSessions],
      });
      return `Série byla úspěšně smazána`;
    },
    error: `Sérii se nepodařilo smazat`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

async function editExerciseSet({
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
  repetitions,
  weight,
}: ExerciseSetProps & {
  workoutSessionExerciseSetId: number;
}) {
  const promise = authAxios.patch<WorkoutSessionExercisesType>(
    `${WORKOUT_SESSIONS_URL}/${workoutSessionId}/workout-session-exercises/${workoutSessionExerciseId}/workout-session-exercise-sets/${workoutSessionExerciseSetId}`,
    {
      repetitions,
      weight,
    }
  );

  toast.promise(promise, {
    loading: `Série se upravuje`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutSessions],
      });
      return `Série byla úspěšně upravena`;
    },
    error: `Sérii se nepodařilo upravit`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

export function useGetWorkoutSessionsQuery() {
  return useQuery({
    queryFn: getWorkoutSessions,
    queryKey: [QUERY_KEYS.workoutSessions],
    placeholderData: keepPreviousData,
  });
}

export function useGetWorkoutSessionByIdQuery(id: number) {
  return useQuery({
    queryFn: () => getWorkoutSessionById(id),
    queryKey: [QUERY_KEYS.workoutSessions, { id }],
    placeholderData: keepPreviousData,
  });
}

export function useCreateWorkoutSessionMutation() {
  return useMutation({
    mutationFn: createWorkoutSession,
  });
}

export function useDeleteWorkoutSessionMutation() {
  return useMutation({
    mutationFn: deleteWorkoutSession,
  });
}

export function useCreateExerciseSetMutation() {
  return useMutation({
    mutationFn: createExerciseSet,
  });
}

export function useDeleteExerciseSetMutation() {
  return useMutation({
    mutationFn: deleteExerciseSet,
  });
}

export function useEditExerciseSetMutation() {
  return useMutation({
    mutationFn: editExerciseSet,
  });
}
