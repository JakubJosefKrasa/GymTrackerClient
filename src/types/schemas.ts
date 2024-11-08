import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, "Emailová adresa nesmí být prázdná")
      .trim()
      .toLowerCase()
      .regex(
        new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}"),
        "Neplatný email!"
      ),
    password: z.string().trim().min(1, "Heslo nesmí být prázdné"),
  })
  .required();

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Required",
        invalid_type_error: "Must be string",
      })
      .trim()
      .min(1, "Emailová adresa nesmí být prázdná")
      .toLowerCase()
      .regex(
        new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}"),
        "Neplatný email!"
      ),
    password: z
      .string()
      .trim()
      .min(1, "Heslo nesmí být prázdné")
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{7,255}$"
        ),
        "Heslo musí obsahovat alespoň jedno velké písmeno, číslici, speciální znak a být dlouhé minimálně 7 znaků!"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Potvrzovací heslo nesmí být prázdné"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se musí shodovat",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;

export const exerciseSchema = z.object({
  exerciseName: z
    .string()
    .min(
      3,
      "Název cviku musí být minimálně 3 znaky dlouhý a maximálně 50 znaků dlouhý!"
    )
    .max(
      50,
      "Název cviku musí být minimálně 3 znaky dlouhý a maximálně 50 znaků dlouhý!"
    )
    .trim(),
});

export type ExerciseSchemaType = z.infer<typeof exerciseSchema>;

export const trainingPlanFormScheme = z.object({
  trainingPlanName: z
    .string()
    .min(
      3,
      "Název tréninkového plánu musí být minimálně 3 znaky dlouhý a maximálně 50 znaků dlouhý!"
    )
    .max(
      50,
      "Název tréninkového plánu musí být minimálně 3 znaky dlouhý a maximálně 50 znaků dlouhý!"
    )
    .trim(),
});

export type TrainingPlanSchemaType = z.infer<typeof trainingPlanFormScheme>;

export const exerciseSelectionFormSchema = z.object({
  exercise: z.string({
    required_error: "Prosím zvolte cvik",
  }),
});

export type ExerciseSelectionFormSchemaType = z.infer<
  typeof exerciseSelectionFormSchema
>;

export const exerciseSetFormSchema = z.object({
  repetitions: z.coerce.number({
    required_error: "Počet opakování nesmí být prázdný",
    invalid_type_error: "Počet opakování musí být číslo",
  }),
  weight: z.coerce.number({
    required_error: "Počet opakování nesmí být prázdný",
    invalid_type_error: "Počet opakování musí být číslo",
  }),
});

export type ExerciseSetFormSchemaType = z.infer<typeof exerciseSetFormSchema>;

export const workoutSessionFormSchema = z.object({
  trainingPlan: z.string({
    required_error: "Prosím zvolte tréninkový plán",
  }),
  date: z.date({
    required_error: "Prosím zvolte datum",
  }),
});

export type WorkoutSessionFormSchemaType = z.infer<
  typeof workoutSessionFormSchema
>;
