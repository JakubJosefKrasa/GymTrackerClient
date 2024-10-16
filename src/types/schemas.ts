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
