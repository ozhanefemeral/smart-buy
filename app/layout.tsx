import "./globals.css";
import "swiper/css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";
import { Providers } from "@/components/layout/providers";

export const metadata = {
  title: "Precedent - Building blocks for your Next.js project",
  description:
    "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={cx(sfPro.variable, inter.variable)}>
          <Suspense fallback="...">
            <Nav />
          </Suspense>
          <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-4 py-8 lg:px-0">
            {children}
          </main>
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
