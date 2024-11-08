import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { BASE_URL, authAxios, queryClient } from "@/api/http";

import { ExerciseSchemaType } from "@/types/schemas";
import { ExerciseType, PaginatedItemsType } from "@/types/types";
import { QUERY_KEYS } from "@/api/queryKeys";

const EXERCISES_URL = BASE_URL + "exercises";

async function getExercises(pageNumber: number, pageSize: number) {
  const response = await authAxios.get<PaginatedItemsType<ExerciseType>>(
    `${EXERCISES_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
}

async function getExercisesNotInTrainingPlan(trainingPlanId: number) {
  const resposne = await authAxios.get<ExerciseType[]>(
    `${EXERCISES_URL}/not-in-training-plan/${trainingPlanId}`
  );

  return resposne.data;
}

async function createExercise(exerciseData: ExerciseSchemaType) {
  const promise = authAxios.post<ExerciseType>(EXERCISES_URL, {
    ...exerciseData,
  });

  toast.promise(promise, {
    loading: `Cvik ${exerciseData.exerciseName} se ukládá`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.exercises] });
      return `Cvik ${exerciseData.exerciseName} byl úspěšně vytvořen`;
    },
    error: `Cvik ${exerciseData.exerciseName} se nepodařilo vytvořit`,
    description: (e) => {
      return e.response?.data?.errors?.exerciseNameMessage;
    },
  });

  return await promise;
}

async function deleteExercise(exercise: ExerciseType) {
  const promise = authAxios.delete<void>(`${EXERCISES_URL}/${exercise.id}`);

  toast.promise(promise, {
    loading: `Cvik ${exercise.exerciseName} se maže`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.exercises] });
      return `Cvik ${exercise.exerciseName} byl úspěšně smazán`;
    },
    error: `Cvik ${exercise.exerciseName} se nepodařilo smazat`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

type EditExerciseProps = ExerciseSchemaType & {
  exercise: ExerciseType;
};

async function editExercise({ exerciseName, exercise }: EditExerciseProps) {
  const promise = authAxios.patch<ExerciseType>(
    `${EXERCISES_URL}/${exercise.id}`,
    {
      exerciseName,
    }
  );

  toast.promise(promise, {
    loading: `Cvik ${exercise.exerciseName} se přejmenovává na ${exerciseName}`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.exercises],
      });
      return `Cvik ${exercise.exerciseName} byl úspěšně přejmenován na ${exerciseName}`;
    },
    error: `Cvik ${exercise.exerciseName} se nepodařilo přejmenovat na ${exerciseName}`,
    description: (e) => {
      switch (e.response?.status) {
        case 400:
          return e.response?.data?.errors?.exerciseNameMessage;
        case 404:
          return e.response?.data?.message;
      }
    },
  });

  return await promise;
}

export function useGetExercises(pageNumber: number, pageSize: number) {
  return useQuery({
    queryFn: () => getExercises(pageNumber, pageSize),
    queryKey: [QUERY_KEYS.exercises, { pageNumber }],
    placeholderData: keepPreviousData,
  });
}

export function useGetExercisesNotInTrainingPlan(trainingPlanId: number) {
  return useQuery({
    queryFn: () => getExercisesNotInTrainingPlan(trainingPlanId),
    queryKey: ["exercises-not-in-training-plan", { trainingPlanId }],
    placeholderData: keepPreviousData,
  });
}

export function useCreateExerciseMutation() {
  return useMutation({
    mutationFn: createExercise,
  });
}

export function useDeleteExerciseMutation() {
  return useMutation({
    mutationFn: deleteExercise,
  });
}

export function useEditExerciseMutation() {
  return useMutation({
    mutationFn: editExercise,
  });
}
