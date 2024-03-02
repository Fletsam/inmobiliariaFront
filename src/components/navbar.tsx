"use client"

import { RootState } from '@/store';
import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const NavbarInicio = () => {
	
		const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 
	 	const {isOpen, onOpen, onOpenChange} = useDisclosure();



  return (
	<section className='bg-primary h-1/4 border-white border-b-1 p-5 static '>

	<div className='flex justify-center gap-10'>
		<div>
	<Image className='rounded-full shadow-white shadow-lg  ' width={100} height={100} src={"/logo2.webp"} alt="logo" />
		</div>
		
		<div className='px-6 text-white '>
			<h1 className=' p-2 text-4xl' >
			Tu Hogar Inmobiliaria 
			</h1>
			<h3 className=' px-9 text-2xl'>
				SIATHI
			</h3>
				<h4 className='px-20 text-xl font-thin'>
					Sistema Informacion Administrativo Tu Hogar Inmobiliaria 
				</h4>
		</div>
          <Link href="/usuario" onClick={onOpen} className="text-white font-normal text-xl bg-primary p-2 border rounded-md shadow-white shadow-sm">
				Perfil
          </Link>
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

	
	</section>
	
  )
}

export default NavbarInicio