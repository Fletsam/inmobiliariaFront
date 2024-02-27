"use client";

import { Sidebar } from "@/components/Sidebar";
import { RootState } from "@/store";
import { Button, Input } from "@nextui-org/react";
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
    <>
     {/*  <div className="bg-slate-100  w-screen h-screen  text-slate-300 selection:bg-blue-600 selection:text-white">
            <div className="flex">
                  <Sidebar />
                  
              </div>
           </div> */}
      <section className="container h-auto flex-col gap-40 p-10 shadow-lg shadow-red-700/50">
        <div className=" w-auto">
          <p className="text-red-700 font-bold text-base w-auto">
            {" "}
            Nombre del Cliente{" "}
          </p>
          <Input
            variant="bordered"
            placeholder="Coloque el nombre de cliente"
            type="text"
            className="max-w-xs text-black py-5"
          />
        </div>
        <div className=" w-full">
          <p className="text-red-700 font-bold text-base w-auto">
            {" "}
            Numero del cliente{" "}
          </p>
          <Input
            variant="bordered"
            placeholder="Coloque su numero de cliente"
            type="text"
            className="max-w-xs text-black py-5"
          />
        </div>
        <div className="pt-4">
          <Button
            color="danger"
            variant="shadow"
            type="submit"
            id="1"
            onClick={() => {
              console.log("enter");
            }}
          >
            Ingresar
          </Button>
        </div>
        {/* <div className="">
          <Link
            href={"/cliente"}
            className=" text-red-700 font-bold text-4xl  "
          >
            {" "}
            Clientes
          </Link>
        </div>
        <div>
          <Link href={"/lotes"} className=" text-red-700 font-bold text-4xl">
            {" "}
            Lotes
          </Link>
        </div> */}
      </section>
    
    </>
      
  );
};

export default page;
