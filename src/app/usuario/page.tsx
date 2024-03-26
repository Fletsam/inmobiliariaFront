"use client"

import { Sidebar } from "@/components/Sidebar";
import { RootState } from "@/store";
import { Button, Image, Input } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const  page  = () => {
    
const { isLogged, nombre } = useSelector((state: RootState) => state.users); 

useEffect(() => {
  if (!isLogged) {
    redirect("/login")
  }
}, [isLogged])

  
  
  return (
    

      <section className="w-full h-full bg-slate-200  block px-5">
        <div className="flex place-content-center ">

        <div className=" mt-10 bg-gray-800 rounded-lg ">
          
        </div>

        </div>
         
          
        
      
            
       
           
           
      </section>
    
      
  );
};

export default page;
