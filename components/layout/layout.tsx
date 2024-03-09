export interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4 py-8 lg:px-0">
      {children}
    </main>
  );
};
