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
    

      <section className="w-full h-[100vh] p-2 bg-red-600 opacity-80 inline-block">
        <div className="flex place-content-center ">

        <div className=" mt-10 bg-gray-800 rounded-lg ">
         <Image className='rounded-lg shadow-white shadow-sm p-1 ' width={500} height={500} src={"/openplot.webp"} alt="news" />
        </div>

        </div>
         
          
        
      
            
       
           
           
      </section>
    
      
  );
};

export default page;
