import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";

import ErrorAlert from "@/components/reusable/ErrorAlert";

import {
  exerciseSelectionFormSchema,
  ExerciseSelectionFormSchemaType,
} from "@/types/schemas";

import { useGetExercisesNotInTrainingPlan } from "@/api/exercisesHttp";
import { useAddExerciseInTrainingPlanMutation } from "@/api/trainingPlansHttp";

type AddExerciseInTrainingPlanModalProps = {
  trainingPlanId: number;
};

export default function AddExerciseInTrainingPlanModal({
  trainingPlanId,
}: AddExerciseInTrainingPlanModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: exercisesNotInTrainingPlan,
    isLoading: isLoadingExercisesNotInPlan,
    isError: isErrorExercisesNotInPlan,
  } = useGetExercisesNotInTrainingPlan(trainingPlanId);

  const {
    mutate: addExerciseInTrainingPlan,
    isPending: isPendingAddExerciseInTrainingPlan,
  } = useAddExerciseInTrainingPlanMutation();

  const form = useForm({
    resolver: zodResolver(exerciseSelectionFormSchema),
    mode: "onTouched",
    defaultValues: {
      exercise: "",
    },
  });

  async function onSubmit(data: ExerciseSelectionFormSchemaType) {
    addExerciseInTrainingPlan({
      trainingPlanId,
      exerciseId: Number(data.exercise),
    });
    onClose();
  }

  if (isLoadingExercisesNotInPlan) {
    return <Spinner />;
  }

  if (isErrorExercisesNotInPlan) {
    return (
      <div className="flex justify-center">
        <ErrorAlert errorTitle="Cviky které je možné přidat se nepodařilo načíst" />
      </div>
    );
  }

  return (
    <>
      <div className="ml-auto">
        <Button
          onPress={onOpen}
          color="primary"
          endContent={<FontAwesomeIcon icon={faPlus} />}
        >
          Přidat cvik
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Přidat cvik do tréninkového plánu
              </ModalHeader>
              <ModalBody>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Controller
                    name="exercise"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        items={exercisesNotInTrainingPlan}
                        isRequired
                        label="Zvolte cvik"
                        isInvalid={form.getFieldState("exercise").invalid}
                        errorMessage={form.formState.errors.exercise?.message}
                        {...field}
                      >
                        {(exercise) => (
                          <SelectItem key={exercise.id}>
                            {exercise.exerciseName}
                          </SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  <div className="flex flex-col-reverse lg:flex-row gap-2 py-4 justify-end">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Zrušit
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={isPendingAddExerciseInTrainingPlan}
                      isDisabled={isPendingAddExerciseInTrainingPlan}
                    >
                      Přidat
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
