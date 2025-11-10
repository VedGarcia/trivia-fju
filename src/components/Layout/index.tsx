import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className="min-w-screen min-h-screen bg-linear-30 to-sky-300 from-purple-400">
        {children}
      </main>
    </>
  );
};
