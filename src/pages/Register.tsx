import DefaultLayout from "@/layouts/DefaultLayout";

import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <RegisterForm />
      </section>
    </DefaultLayout>
  );
}
