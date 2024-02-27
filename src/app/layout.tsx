"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthInitializer from "./protected.router";


const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <AuthInitializer>
          <html lang="en">
              <body className={inter.className}>{children}</body>
          </html>
      </AuthInitializer>
          </Provider>
    
  );
}
