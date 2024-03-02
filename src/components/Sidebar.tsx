import Image from "next/image";
import React from "react";
import {
  IoBriefcaseOutline,
  IoDocumentAttachOutline,
  IoPersonAdd,
} from "react-icons/io5";
import { SidebarMenuitem } from "./SidebarMenuitem";
import {  BsFileEarmarkPerson, BsMegaphoneFill } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";


const menuItems = [
  {
    path: "/login",
    icon: <FiDollarSign size={50} />,
    title: "Contabilidad",
    subtitle: "Apartado de contabilidad",
  },
  {
    path: "/cliente",
    icon: <BsFileEarmarkPerson size={50} />,
    title: "Clientes",
    subtitle: "Apartado de Clientes",
  },
  {
    path: "/ventas",
    icon: <IoBriefcaseOutline size={50} />,
    title: "Ventas",
    subtitle: "Apartado de ventas",
  },
  {
    path: "/rh",
    icon: <IoPersonAdd size={50} />,
    title: "Recursos Humanos",
    subtitle: "Apartado de Recursos Humanos",
  },
  {
    path: "/marketing",
    icon: <BsMegaphoneFill size={50} />,
    title: "Marketing",
    subtitle: "Apartado de Publicidad",
  },
  {
    path: "/produccion",
    icon: <IoDocumentAttachOutline size={50} />,
    title: "Producción",
    subtitle: "Apartado de producción",
  },
];

export const Sidebar = () => {
 


  return (
    <nav
      id="menu"
      style={{ width: "300px" }}
      className="bg-primary min-h-screen z-10 text-white w-64 left-0 relative pt-10 border-r-1 border-white "
    >
      <div id="nav" className="w-full px-6 text-xs">
        {menuItems.map((item) => (
          <SidebarMenuitem  key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
};
