import Image from "next/image";
import React from "react";
import {
  IoBrowsersOutline,
  IoCalculator,
  IoHomeOutline,
  IoLogoReact,
  IoMoon,
} from "react-icons/io5";
import { SidebarMenuitem } from "./SidebarMenuitem";
import { Logo } from "@/helpers";
import { TbHomePlus } from "react-icons/tb";
import { BsFileEarmark, BsFileEarmarkPerson } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";

const menuItems = [
  {
    path: "/login",
    icon: <FiDollarSign size={40} />,
    title: "Cobranza",
    subtitle: "Cobranza",
  },
  {
    path: "/cliente",
    icon: <BsFileEarmarkPerson size={40} />,
    title: "Clientes",
    subtitle: "Lista de Clientes",
  },
  {
    path: "/lotes",
    icon: <TbHomePlus size={40} />,
    title: "Lotes",
    subtitle: "Lista de Lotes",
  },
];

export const Sidebar = () => {
  return (
    <nav
      id="menu"
      style={{ width: "300px" }}
      className="bg-red-800 min-h-screen z-10 text-slate-300 w-64 left-0 "
    >
      <div id="logo" className="my-4 px-6">
        <h1 className=" flex items-center text-lg md:text-2xl font-bold text-white">
          <Image width={200} height={200} src={"/Logo.png"} alt="logo" />
        </h1>
        <p className="text-white font-normal text-xl">Maneja tus Actividades</p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-white font-normal text-xl">Bienvenido</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            {/*  <Image
              width={50}
              height={50}
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt=""
            /> */}
          </span>
          <span className="text-white font-normal text-xl bg-red-700 p-2 border rounded-md">
            Luis Cervantes
          </span>
        </a>
      </div>
      <div id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SidebarMenuitem key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
};
