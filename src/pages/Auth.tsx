import { useState } from "react";

import { Tabs, Tab } from "@heroui/tabs";

import DefaultLayout from "@/layouts/DefaultLayout";

import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/register/RegisterForm";

export default function AuthPage() {
  const [selectedTab, setSelectedTab] = useState<string | number>("login");

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full max-w-md">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            fullWidth
            aria-label="Auth"
            color="primary"
          >
            <Tab key="login" title="Přihlásit">
              <LoginForm setSelectedTab={setSelectedTab} />
            </Tab>
            <Tab key="register" title="Registrovat">
              <RegisterForm setSelectedTab={setSelectedTab} />
            </Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
