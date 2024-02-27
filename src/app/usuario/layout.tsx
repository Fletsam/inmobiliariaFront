
import { Sidebar } from "@/components/Sidebar";
import ProtectedRoute from "../protected.router";
import page from "./page";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/modules/user.module";
import { useEffect } from "react";
import AuthInitializer from "../protected.router";
import Page from "../page";


export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
     return (
        <div className="bg-slate-100  w-screen h-screen  text-slate-300 selection:bg-blue-600 selection:text-white">
            <div className="flex"> 
                  <Sidebar /> 
                      <div className="text-slate-950 w-full">{children} </div>
              </div>
          </div>  
         
  );

  /*  return redirect("/login") ; */
 
}
