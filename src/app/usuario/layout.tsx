"use client"
import { Sidebar } from "@/components/Sidebar";
import NavbarInicio from "@/components/navbar";


export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    
     return (
        <div className=" text-slate-300">
           <NavbarInicio> </NavbarInicio>
           <div className="flex ">
            <Sidebar /> 
                  {children}
           </div>
                  
          </div>  
         
  );

  /*  return redirect("/login") ; */
 
}
