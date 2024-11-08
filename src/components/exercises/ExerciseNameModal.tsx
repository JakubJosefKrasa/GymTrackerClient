import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  UseDisclosureProps,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { exerciseSchema, ExerciseSchemaType } from "@/types/schemas";
import { ExerciseType, ModalMode } from "@/types/types";

import {
  useCreateExerciseMutation,
  useEditExerciseMutation,
} from "@/api/exercisesHttp";

type ExerciseNameModalProps = UseDisclosureProps & {
  exercise: ExerciseType | null;
  mode: ModalMode;
};

export default function ExerciseNameModal({
  isOpen,
  onClose,
  exercise,
  mode,
}: ExerciseNameModalProps) {
  const { mutate: editExercise, isPending: isPendingEditExercise } =
    useEditExerciseMutation();
  const { mutate: createExercise, isPending: isPendingCreateExercise } =
    useCreateExerciseMutation();

  const form = useForm<ExerciseSchemaType>({
    resolver: zodResolver(exerciseSchema),
    mode: "onTouched",
    defaultValues: {
      exerciseName: "",
    },
  });

  async function onSubmit(data: ExerciseSchemaType) {
    if (mode === ModalMode.Edit && exercise !== null) {
      editExercise({ exercise, exerciseName: data.exerciseName });
    } else {
      createExercise(data);
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
                  ? "Přejmenovat cvik"
                  : "Vytvořit nový cvik"}
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Controller
                    name="exerciseName"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        label="Cvik"
                        placeholder="Zadejte cvik"
                        variant="bordered"
                        isInvalid={form.getFieldState("exerciseName").invalid}
                        errorMessage={
                          form.formState.errors.exerciseName?.message
                        }
                        {...field}
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
                          ? isPendingEditExercise
                          : isPendingCreateExercise
                      }
                      isDisabled={
                        !form.formState.isValid ||
                        (mode === ModalMode.Edit
                          ? isPendingEditExercise
                          : isPendingCreateExercise)
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
