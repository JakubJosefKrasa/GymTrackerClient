import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Alert } from "@heroui/alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import ErrorList from "@/components/reusable/ErrorList";
import FormCard from "@/components/reusable/FormCard";

import { loginSchema, LoginType } from "@/types/schemas";
import { SetSelectedTabProps } from "@/types/types";
import { useLoginMutation } from "@/api/authHttp";
import useAuth from "@/hooks/useAuth";

type LoginFormProps = {
  setSelectedTab: SetSelectedTabProps;
};

export default function LoginForm({ setSelectedTab }: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLoginMutation();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let errorMessages: string[] = [];

  if (isError && isAxiosError(error)) {
    if (error.response?.data.message) {
      errorMessages.push(error.response.data.message);
    }
  }

  if (isSuccess) {
    const authObject = {
      isLoggedIn: true,
      email: form.getValues("email"),
    };
    localStorage.setItem("auth", JSON.stringify(authObject));
    setAuth(authObject);
    navigate("/", { replace: true });
  }

  async function onSubmit(data: LoginType) {
    login(data);
  }

  return (
    <FormCard>
      <p className="pb-2 text-xl font-medium">Přihlásit</p>
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
              type="email"
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
        <Button
          className="mt-4"
          color="primary"
          type="submit"
          isLoading={isPending}
          isDisabled={!form.formState.isValid || isPending}
        >
          Přihlásit
        </Button>
      </form>
      <p className="text-center text-small">
        Ještě nemáte účet?{" "}
        <Link
          className="hover:cursor-pointer"
          onPress={() => setSelectedTab("register")}
          size="sm"
        >
          Vytvořit
        </Link>
      </p>
      {isError && (
        <Alert
          title="Přihlášení se nezdařilo!"
          description={<ErrorList errorMessages={errorMessages} />}
        />
      )}
      {isSuccess && <Alert color="success" title="Úspěšně přihlášen" />}
    </FormCard>
  );
}
