import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import useCliente from "../hooks/useGetClientes";

export default function ClientModal(props:any) {
  const {isOpen, onOpen, onOpenChange,} = useDisclosure();
	const {cliente,  showClient } = useCliente()
	
	
	
	if(props!){
		useEffect(() => {
		console.log(props.props.nombre);
	}, [cliente])
	
	
 return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody className="text-black">
					<p className="text-black">{props.nombre}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
	}
 
}