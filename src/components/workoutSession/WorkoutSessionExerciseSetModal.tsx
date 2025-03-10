import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  UseDisclosureProps,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { NumberInput } from "@heroui/number-input";

import {
  exerciseSetFormSchema,
  ExerciseSetFormSchemaType,
} from "@/types/schemas";
import { ModalMode } from "@/types/types";

import {
  useCreateExerciseSetMutation,
  useEditExerciseSetMutation,
} from "@/api/workoutSessionsHttp";

type ExerciseNameModalProps = UseDisclosureProps & {
  mode: ModalMode;
  workoutSessionId?: number;
  workoutSessionExerciseId?: number;
  workoutSessionExerciseSetId?: number | null;
  currentWeight?: number;
  currentRepetitions?: number;
};

export default function WorkoutSessionExerciseSetModal({
  isOpen,
  onClose,
  mode,
  workoutSessionId,
  workoutSessionExerciseId,
  workoutSessionExerciseSetId,
  currentWeight,
  currentRepetitions,
}: ExerciseNameModalProps) {
  const { mutate: editSet, isPending: isPendingEditSet } =
    useEditExerciseSetMutation();
  const { mutate: createSet, isPending: isPendingCreateSet } =
    useCreateExerciseSetMutation();

  const form = useForm<ExerciseSetFormSchemaType>({
    resolver: zodResolver(exerciseSetFormSchema),
    mode: "onTouched",
    defaultValues: {
      repetitions: currentRepetitions !== undefined ? currentRepetitions : 0,
      weight: currentWeight !== undefined ? currentWeight : 0,
    },
  });

  useEffect(() => {
    if (currentWeight !== undefined && currentRepetitions !== undefined) {
      form.reset({
        weight: currentWeight,
        repetitions: currentRepetitions,
      });
    }
  }, [currentWeight, currentRepetitions, form]);

  async function onSubmit(data: ExerciseSetFormSchemaType) {
    if (
      workoutSessionId !== undefined &&
      workoutSessionExerciseId !== undefined
    ) {
      if (mode === ModalMode.Edit) {
        if (
          workoutSessionExerciseSetId !== undefined &&
          workoutSessionExerciseSetId !== null
        ) {
          editSet({
            workoutSessionId: workoutSessionId,
            workoutSessionExerciseId: workoutSessionExerciseId,
            workoutSessionExerciseSetId: workoutSessionExerciseSetId,
            repetitions: data.repetitions,
            weight: data.weight,
          });
        }
      } else {
        createSet({
          workoutSessionId: workoutSessionId,
          workoutSessionExerciseId: workoutSessionExerciseId,
          repetitions: data.repetitions,
          weight: data.weight,
        });
      }
    }

    form.reset();
    onClose?.();
  }

  return (
    <>
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
                {mode === ModalMode.Edit
                  ? "Upravit sérii"
                  : "Přidat novou sérii"}
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Controller
                    name="weight"
                    control={form.control}
                    render={({ field }) => (
                      <NumberInput
                        autoFocus
                        isRequired
                        label="Váha"
                        placeholder="Zadejte váhu"
                        variant="bordered"
                        isInvalid={form.getFieldState("weight").invalid}
                        errorMessage={form.formState.errors.weight?.message}
                        endContent={"kg"}
                        value={field.value}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <Controller
                    name="repetitions"
                    control={form.control}
                    render={({ field }) => (
                      <NumberInput
                        isRequired
                        label="Počet opakování"
                        placeholder="Zadejte počet opakování"
                        variant="bordered"
                        isInvalid={form.getFieldState("repetitions").invalid}
                        errorMessage={
                          form.formState.errors.repetitions?.message
                        }
                        endContent={"x"}
                        value={field.value}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <div className="flex flex-col-reverse lg:flex-row gap-2 py-4 justify-end">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Zrušit
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={
                        mode === ModalMode.Edit
                          ? isPendingEditSet
                          : isPendingCreateSet
                      }
                      isDisabled={
                        !form.formState.isValid ||
                        (mode === ModalMode.Edit
                          ? isPendingEditSet
                          : isPendingCreateSet)
                      }
                    >
                      {mode === ModalMode.Edit ? "Změnit" : "Vytvořit"}
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
