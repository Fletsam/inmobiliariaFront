"use client"

import { RootState } from '@/store';
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { IoPersonCircle } from 'react-icons/io5';
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
		icon:  <IoPersonCircle size={30}/>,
		title: "Usuario",
	},
	{
		path: "/usuario" ,
		icon:  <IoPersonCircle size={30}/>,
		title: "Estadistica",
	}
]

  return (

	<div className=' grid w-full h-full bg-slate-200 absolute'  >
		<div className='grid sm:flex  text-black bg-slate-200 shadow-small shadow-primary w-full sm:h-40 py-5 justify-center static pt-2 '>
		<Image className=' rounded-full shadow-white w-auto h-auto shadow-sm cursor-pointer sm:flex justify-items-center'   width={100} height={100} src={"/logo2.webp"} alt="logo" onClick={()=>router.push("/usuario")} />	
			<div className='sm:flex flex-col text-left bg-slate-200  p-5 hidden'>
				<h1 className='text-2xl text-primary '>
					Tu Hogar Inmobiliaria
					
				</h1>
				<h3 className='text-2xl px-5 text-left  text-primary '>
				SIATHI
			</h3>
		<div className=' sm:flex justify-between '>
		<div className='pt-2 flex justify-self-center gap-5 '>
			{links.map ( (item)=>( 
				<div key={item.title} className='flex flex-col justify-evenly '>
					<Link className=' gap-2 flex justify-evenly text-black font-semibold'  href={item.path}>  <p className='flex'> {item.icon}  {item.title}</p> </Link>
						
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