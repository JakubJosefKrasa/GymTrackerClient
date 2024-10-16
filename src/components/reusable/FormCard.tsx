import { PropsWithChildren } from "react";

export default function FormCard({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-md flex flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small ">
      {children}
    </div>
  );
}
