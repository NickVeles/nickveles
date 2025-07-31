import { ReactNode } from "react";

type MainProps = {
  children?: ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <main
      className="flex flex-col flex-1 min-h-(--main-min-height) justify-center items-center px-4 sm:px-24 lg:px-32 py-8 sm:py-12 gap-8 font-sans"
    >
      {children}
    </main>
  );
}
