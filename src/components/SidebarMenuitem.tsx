"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;

}

export const SidebarMenuitem = ({ path, icon, title }: Props) => {
  const pathname = usePathname();

  return (
   <div className="w-auto h-auto py-3 border-b-1 border-white hover:bg-white/5">
     <Link
      href={path}
    >
      <div className="flex flex-col justify-around gap-2 m-0 w-full">
      <span className="text-sm font-bold text-white flex justify-evenly "> {icon} </span>
      
       <span className="text-sm font-bold  text-white  text-center ">{title}</span>
      </div>
    </Link>
   </div>
   
   
      
  );
};
