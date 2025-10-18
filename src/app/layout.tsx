// Libs
import { Metadata } from "next";
import { StoreProvider } from "@/providers";

import { cairo } from "@/fonts";

// Shared
import { Toaster } from "@/shared/components/ui/sonner";
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
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
