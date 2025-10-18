// Libs
import { Metadata } from "next";

// Shared
import { cairo } from "@/shared/fonts";
import { StoreProvider } from "@/shared/providers";
// @ts-ignore
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "EyeGo AIoT platform for smart hospitality",
  description: "EyeGo AIoT platform for smart hospitality built to protect people and performance - Smart Restaurants - AI Inspection - Footfall analysis - Food safety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.className} antialiased`}
      >
        {/* Provides Redux Store */}
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
