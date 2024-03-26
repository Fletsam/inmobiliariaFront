import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image} from "@nextui-org/react";
import { IoBarChartOutline, IoBriefcaseOutline, IoBusinessOutline, IoChatbubbleEllipsesOutline, IoDocumentAttachOutline, IoPersonAdd, IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FiDollarSign } from "react-icons/fi";
import { BsFileEarmarkPerson, BsMegaphoneFill } from "react-icons/bs";


export default function NavBar({children}) {
  	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 

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
const links = [
	{
		path: "/perfil" ,
		icon:  <IoPersonCircle size={30}/>,
		title: "Usuario",
		subtitle:`${nombre}`
	},
	{
		path: "/usuario" ,
		icon:  <IoChatbubbleEllipsesOutline size={30}/>,
		title: "Capacitacion",
	},
	{
		path: "/usuario" ,
		icon:  <IoBarChartOutline size={30}/>,
		title: "Estadistica",
	}
]

  return (
	<div className=" sm:w-full absolute w-full">
		<Navbar onMenuOpenChange={setIsMenuOpen} className="text-black bg-primary justify-start px-5 py-2 w-auto">
      <NavbarContent className="w-auto">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
		
		<NavbarBrand className="text-white sm:flex " >
			<div className="grid px-5 w-[21vh] sm:flex sm:justify-start justify-items-center">
				<Image className=' rounded-full shadow-white w-auto h-auto shadow-sm cursor-pointer sm:flex justify-items-center'   width={60} height={60} src={"/logo2.webp"} alt="logo" onClick={()=>router.push("/usuario")} />	

			</div>	
			<div className="sm:flex flex-col hidden">
			<p className="font-bold  text-white">TU HOGAR INMOBILIARIA</p>
          	<p className="font-bold  text-white">SIATHI</p>
			</div>
          
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
		{links.map((item)=> (
			<NavbarItem  key={`${item.path}`}>
					<Link className="text-white" href={item.path}>
					 <p className='flex gap-2'> {item.icon}  {item.title}</p>
					</Link>
			</NavbarItem>
		))}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="text-black">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-black pt-10"
              href={item.path}
              size="lg"
            >
              <p className="flex gap-2">{item.icon} {item.title} </p>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
	  
    </Navbar>
	<div className=' w-full relative flex '>
			{children}
		</div>
	</div>
    
  );
}