import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";
import { Providers } from "@/components/layout/providers";
import { PageLayout } from "@/components/layout/layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "SmartBuy Market",
  metadataBase: new URL("https://smartbuy-market.vercel.app/"),
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
          <PageLayout>{children}</PageLayout>
          <Analytics />
          <SpeedInsights />
        </body>
      </Providers>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  );
}
