export interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4 py-4 pb-16 md:py-8 md:pb-4 lg:px-0">
      {children}
    </main>
  );
};
