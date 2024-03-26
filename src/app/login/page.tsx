"use client";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/helpers";
import { Button, Image, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import useLogin from "./hooks/useLogin";



const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);


  const {data,handleSetData,disabledButton,showAlert,setShowAlert,handleLogin} = useLogin()

  

  return (

    <main className=" bg-white mx-auto md:grid md:grid-cols-2  gap-10 p-5 items-center">
      <Image className="p-10 w-auto h-auto" src="descarga.jpg" alt="logo" />
      {/*  <div className="flex  mb-4 mt-8 font-bold text-6xl ">
        <h1 className=" text-red-700">
          Inicia sesión{" "}
          <span className="flex mt-5  text-red-700/80"> administra tus </span>
          <span className="flex mt-5  text-red-700/60"> Clientes y Lotes </span>
        </h1>
      </div> */}

      <section className="container flex-col gap-40 p-10 shadow-lg shadow-red-700/50">
        <div className="w-auto">
          <p className="text-red-700 font-bold text-base w-auto">
            {" "}
            Usuario{" "}
          </p>
          <Input
            variant="bordered"
            placeholder="Coloque su numero de cliente"
            type="text"
            className="max-w-xs text-black py-5"
            value={data.usuario}
            onChange={handleSetData}
            id="usuario"
            name="usuario"
          />
        </div>
        <div className=" w-full">
          <p className="text-red-700 font-bold text-base w-auto"> Password </p>
          <Input
            variant="bordered"
            placeholder="Enter your password"
            value={data.pass}
            onChange={handleSetData}
            id="pass"
            name="pass"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
        
            className="max-w-xs text-black py-2"
          />
        </div>
        <div className="pt-4">
          <Button
            color="danger"
            variant="shadow"
            type="submit"
            id="1"
            onClick={handleLogin}
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
    </main>
  );
};

export default Login;
