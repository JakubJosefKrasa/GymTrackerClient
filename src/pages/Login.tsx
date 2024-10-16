import DefaultLayout from "@/layouts/DefaultLayout";

import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <LoginForm />
      </section>
    </DefaultLayout>
  );
}
