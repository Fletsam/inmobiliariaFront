"use client"

import { RootState } from '@/store';
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoBarChartOutline, IoChatbubbleEllipsesOutline, IoChatbubbleOutline, IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Sidebar } from './Sidebar';

const NavbarInicio = ({children}) => {
	
		const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 
	 	const {isOpen, onOpen, onOpenChange} = useDisclosure();
		
		const router = useRouter()
const links = [
	{
		path: "/usuario" ,
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

	<div className=' grid w-full h-5 bg-red-700 absolute'  >
		<div className='grid sm:flex  text-black bg-primary shadow-small shadow-primary w-full sm:h-20 py-5 justify-items-center sm:justify-start relative pt-2 '>
		<div className=' grid px-5 w-[21vh] sm:flex justify-center '>
			<Image className=' rounded-full shadow-white w-auto h-auto shadow-sm cursor-pointer sm:flex justify-items-center'   width={60} height={60} src={"/logo2.webp"} alt="logo" onClick={()=>router.push("/usuario")} />	
		</div>
			<div className='sm:flex text-center  relative'>
				<div className='hidden sm:flex'>
					<h1 className='text-2xl text-white '>
					Tu Hogar Inmobiliaria
				</h1>
				<h3 className='text-2xl px-5 text-center  text-white '>
				SIATHI
				</h3>
				</div>
				
		<div className=' sm:flex justify-between relative '>
		<div className='pt-2 flex justify-self-center gap-16 px-5'>
			{links.map ( (item)=>( 
				<div key={item.title} className='flex flex-col justify-evenly'>
					<Link className=' gap-4 flex justify-evenly text-white font-semibold'  href={item.path}>  <p className='flex gap-2'> {item.icon}  {item.title}</p> </Link>
						
				</div>
				
				
				)
			)
			}
		</div>
		</div>
			</div>
		</div>
		<div className=' w-full relative flex '>
			{children}
		</div>
		
		
	<>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">Hola</p></ModalHeader>
              <ModalBody className="text-black " >
					<h1>
							<p>{nombre}</p>
					</h1>
               
              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
		
</div>
	
	

	
   
	
  )
}

export default NavbarInicio