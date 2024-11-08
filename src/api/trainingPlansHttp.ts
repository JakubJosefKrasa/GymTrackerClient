import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { BASE_URL, authAxios, queryClient } from "@/api/http";

import { QUERY_KEYS } from "@/api/queryKeys";
import { PaginatedItemsType, TrainingPlanType } from "@/types/types";
import { TrainingPlanSchemaType } from "@/types/schemas";

const TRAINING_PLANS_URL = BASE_URL + "training-plans";

async function getTrainingPlans(pageNumber: number, pageSize: number) {
  const response = await authAxios.get<PaginatedItemsType<TrainingPlanType>>(
    `${TRAINING_PLANS_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
}

async function getTrainingPlanById(id: number) {
  const response = await authAxios.get<TrainingPlanType>(
    `${TRAINING_PLANS_URL}/${id}`
  );

  return response.data;
}

async function createTrainingPlan(trainingPlanData: TrainingPlanSchemaType) {
  const promise = authAxios.post<TrainingPlanType>(`${TRAINING_PLANS_URL}`, {
    ...trainingPlanData,
  });

  toast.promise(promise, {
    loading: `Tréninkový plán ${trainingPlanData.trainingPlanName} se ukládá`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingPlans],
      });
      return `Tréninkový plán ${trainingPlanData.trainingPlanName} byl úspěšně vytvořen`;
    },
    error: `Tréninkový plán ${trainingPlanData.trainingPlanName} se nepodařilo vytvořit`,
    description: (e) => {
      return e.response?.data?.errors?.trainingPlanNameMessage;
    },
  });

  return await promise;
}

async function deleteTrainingPlan(trainingPlan: TrainingPlanType) {
  const promise = authAxios.delete<void>(
    `${TRAINING_PLANS_URL}/${trainingPlan.id}`
  );

  toast.promise(promise, {
    loading: `Tréninkový plán ${trainingPlan.trainingPlanName} se maže`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingPlans],
      });
      return `Tréninkový plán ${trainingPlan.trainingPlanName} byl úspěšně smazán`;
    },
    error: `Tréninkový plán ${trainingPlan.trainingPlanName} se nepodařilo smazat`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

type EditTrainingPlanProps = TrainingPlanSchemaType & {
  trainingPlan: TrainingPlanType;
};

async function editTrainingPlan({
  trainingPlanName,
  trainingPlan,
}: EditTrainingPlanProps) {
  const promise = authAxios.patch<TrainingPlanType>(
    `${TRAINING_PLANS_URL}/${trainingPlan.id}`,
    {
      trainingPlanName,
    }
  );

  toast.promise(promise, {
    loading: `Tréninkový plán ${trainingPlan.trainingPlanName} se přejmenovává na ${trainingPlanName}`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingPlans],
      });
      return `Tréninkový plán ${trainingPlan.trainingPlanName} byl úspěšně přejmenován na ${trainingPlanName}`;
    },
    error: `Tréninkový plán ${trainingPlan.trainingPlanName} se nepodařilo přejmenovat na ${trainingPlanName}`,
    description: (e) => {
      switch (e.response?.status) {
        case 400:
          return e.response?.data?.errors?.trainingPlanNameMessage;
        case 404:
          return e.response?.data?.message;
      }
    },
  });

  return await promise;
}

type AddExerciseInTrainingPlanProps = {
  trainingPlanId: number;
  exerciseId: number;
};

async function addExerciseInTrainingPlan({
  trainingPlanId,
  exerciseId,
}: AddExerciseInTrainingPlanProps) {
  const promise = authAxios.put<TrainingPlanType>(
    `${TRAINING_PLANS_URL}/${trainingPlanId}/exercises/${exerciseId}`
  );

  toast.promise(promise, {
    loading: `Cvik se přidává do tréninkového plánu`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingPlans, { id: trainingPlanId }],
      });
      await queryClient.invalidateQueries({
        queryKey: ["exercises-not-in-training-plan", { trainingPlanId }],
      });

      return "Cvik byl úspěšně přidán do tréninkového plánu";
    },
    error: `Cvik se nepodařilo přidat do tréninkového plánu`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

type RemoveExerciseFromTrainingPlanProps = AddExerciseInTrainingPlanProps;

async function removeExerciseFromTrainingPlan({
  trainingPlanId,
  exerciseId,
}: RemoveExerciseFromTrainingPlanProps) {
  const promise = authAxios.delete<void>(
    `${TRAINING_PLANS_URL}/${trainingPlanId}/exercises/${exerciseId}`
  );

  toast.promise(promise, {
    loading: `Cvik se odebírá z tréninkového plánu`,
    success: async () => {
      await promise;
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.trainingPlans, { id: trainingPlanId }],
      });
      await queryClient.invalidateQueries({
        queryKey: ["exercises-not-in-training-plan", { trainingPlanId }],
      });

      return "Cvik byl úspěšně odebrán z tréninkového plánu";
    },
    error: `Cvik se nepodařilo odebrat z tréninkového plánu`,
    description: (e) => {
      return e.response?.data?.message;
    },
  });

  return await promise;
}

export function useGetTrainingPlans(pageNumber: number, pageSize: number) {
  return useQuery({
    queryFn: () => getTrainingPlans(pageNumber, pageSize),
    queryKey: [QUERY_KEYS.trainingPlans, { pageNumber }],
    placeholderData: keepPreviousData,
  });
}

export function useGetTrainingPlanById(id: number) {
  return useQuery({
    queryFn: () => getTrainingPlanById(id),
    queryKey: [QUERY_KEYS.trainingPlans, { id }],
    placeholderData: keepPreviousData,
  });
}

export function useCreateTrainingPlanMutation() {
  return useMutation({
    mutationFn: createTrainingPlan,
  });
}

export function useDeleteTrainingPlanMutation() {
  return useMutation({
    mutationFn: deleteTrainingPlan,
  });
}

export function useEditTrainingPlanMutation() {
  return useMutation({
    mutationFn: editTrainingPlan,
  });
}

export function useAddExerciseInTrainingPlanMutation() {
  return useMutation({
    mutationFn: addExerciseInTrainingPlan,
  });
}

export function useRemoveExerciseFromTrainingPlanMutation() {
  return useMutation({
    mutationFn: removeExerciseFromTrainingPlan,
  });
}
