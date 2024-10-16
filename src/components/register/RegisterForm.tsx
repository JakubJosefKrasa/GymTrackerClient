import { useState } from "react";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import FormCard from "@/components/reusable/FormCard";
import ErrorAlert from "@/components/reusable/ErrorAlert";
import SuccessAlert from "@/components/reusable/SuccessAlert";

import { registerSchema, RegisterType } from "@/types/schemas";
import { useRegisterMutation } from "@/api/authHttp";

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const {
    mutate: register,
    isPending,
    isSuccess,
    isError,
    error,
  } = useRegisterMutation();
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  let errorMessages: string[] = [];

  if (isError && isAxiosError(error)) {
    if (error.response?.data.errors) {
      const messages = Object.values(error.response.data.errors).filter(
        (message): message is string => message !== undefined
      );
      errorMessages = [...messages];

      console.log(messages);
    } else if (error.response?.data.message) {
      errorMessages.push(error.response.data.message);
    }
  }

  async function onSubmit(data: RegisterType) {
    register(data);
    form.reset();
  }

  return (
    <FormCard>
      <p className="pb-2 text-xl font-medium">Registrovat</p>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input
              isRequired
              type="text"
              label="Emailová adresa"
              placeholder="Zadejte email"
              variant="bordered"
              isInvalid={form.getFieldState("email").invalid}
              errorMessage={form.formState.errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              label="Heslo"
              placeholder="Zadejte heslo"
              variant="bordered"
              isInvalid={form.getFieldState("password").invalid}
              errorMessage={form.formState.errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label="toggle password visibility"
                >
                  {isPasswordVisible ? (
                    <FontAwesomeIcon icon={faEyeSlash} aria-hidden="true" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                  )}
                </button>
              }
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <Input
              isRequired
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Potvrzení hesla"
              placeholder="Zadejte heslo znovu"
              variant="bordered"
              isInvalid={form.getFieldState("confirmPassword").invalid}
              errorMessage={form.formState.errors.confirmPassword?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  aria-label="toggle confirm password visibility"
                >
                  {isConfirmPasswordVisible ? (
                    <FontAwesomeIcon icon={faEyeSlash} aria-hidden="true" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                  )}
                </button>
              }
              {...field}
            />
          )}
        />
        <Button
          className="mt-4"
          color="primary"
          type="submit"
          isLoading={isPending}
          isDisabled={!form.formState.isValid || isPending}
        >
          Registrovat
        </Button>
      </form>
      <p className="text-center text-small">
        Již máte účet?{" "}
        <Link href="/login" size="sm">
          Přihlásit
        </Link>
      </p>
      {isError && (
        <ErrorAlert
          errorTitle="Registrace se nezdařila"
          errorMessages={errorMessages}
        />
      )}
      {isSuccess && <SuccessAlert title="Účet byl úspěšně vytvořen" />}
    </FormCard>
  );
}
