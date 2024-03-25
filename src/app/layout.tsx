"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import AuthInitializer from "./protected.router";
import NavbarInicio from "@/components/navbar";
import { Sidebar } from "@/components/Sidebar";



const inter = Inter({ subsets: ["latin"],  });

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
          <html className=" w-screen relative bg-slate-200 m-0 p-0 flex flex-col  " lang="es">
              <body className={inter.className}>
  
                          <div className="w-full">
                            <NavbarInicio>
                                <Sidebar/>
                               <div className="w-full ">
                                 {children}
                               </div>
                            </NavbarInicio>
                           
                           </div>  
                          
                  
                </body>

          </html>
            
      </AuthInitializer>
          </Provider>
    
  );
}
