import { ReactNode } from "react";

type MainProps = {
  children?: ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <main
      id="main-content"
      className="flex flex-col flex-1 min-h-(--main-min-height) justify-center items-center gap-32 font-sans"
    >
      {children}
    </main>
  );
}
