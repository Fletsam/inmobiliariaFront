import Image from "next/image";
import React from "react";
import {
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoDocumentAttachOutline,
  IoPersonAdd,
} from "react-icons/io5";
import { SidebarMenuitem } from "./SidebarMenuitem";
import {  BsFileEarmarkPerson, BsMegaphoneFill } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";


const menuItems = [
  {
    path: "/login",
    icon: <FiDollarSign size={30} />,
    title: "Contabilidad",

  },
    {
    path: "/fraccionamientos",
    icon: <IoBusinessOutline size={30} />,
    title: "Inventario",
  },
  {
    path: "/cliente",
    icon: <BsFileEarmarkPerson size={30} />,
    title: "Clientes",
  },
  {
    path: "/ventas",
    icon: <IoBriefcaseOutline size={30} />,
    title: "Ventas",
  },
  {
    path: "/rh",
    icon: <IoPersonAdd size={30} />,
    title: "Recursos Humanos",

  },
  {
    path: "/marketing",
    icon: <BsMegaphoneFill size={30} />,
    title: "Marketing",
  },
  {
    path: "/produccion",
    icon: <IoDocumentAttachOutline size={30} />,
    title: "Producción",
  },

];

export const Sidebar = () => {
 


  return (
    <nav
      id="menu"
      className="bg-primary w-[25vh] left-0 text-white border-r-1 hidden border-white sm:inline-block static"
    >
      <div id="nav" className={`w-full px-6 text-xs pt-6 sm:block `}>
        {/* <div className="p-5  border-b-1 border-white hover:bg-white/5">
        <Image className='rounded-full shadow-white w-auto h-auto shadow-sm cursor-pointer flex justify-items-center'   width={100} height={100} src={"/logo2.webp"} alt="logo" onClick={()=>router.push("/usuario")} />
        </div> */}
        {menuItems.map((item) => (
          <SidebarMenuitem  key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
};
