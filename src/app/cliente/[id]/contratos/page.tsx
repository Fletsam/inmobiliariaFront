"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useGetClientebyId from '../../hooks/useGetClientebyId'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useFraccs from '@/app/fraccionamientos/hooks/useGetFracc'
import useGetFraccbyId from '@/app/fraccionamientos/hooks/useGetFraccbyId'
import { Button, Card, CardBody, CardFooter, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import useLotes from '@/app/lotes/hooks/useGetLotes'
import useRegisterContrato from './hooks/useRegisterContrato'
import { CldImage } from 'next-cloudinary'

const Contrato = () => {
const params = useParams()
const itemfind = (parseInt(params.id))

const {startLoadingClientes,dataCliente,cliente} = useGetClientebyId()
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)
const {lotesVendidos,startLoadingLotes,dataLotes} = useLotes()

const lotes = lotesVendidos

const {data, handleSetData,registerContratoApi} = useRegisterContrato()

const {isOpen, onOpen, onOpenChange} = useDisclosure();
const param = `clientes/${itemfind}`

useEffect(() => {
  startLoadingClientes(param)
	
}, [dataCliente])
/* 
if (cliente.usuarioId!==id) {
	console.log("no tienes permiso");
	
}
console.log(cliente); */
useEffect(() => {
  const param = `lotes/disponibles`
  startLoadingLotes(param)
	
}, [dataLotes])
const img = "/S_002.jpg"

const [lote , setLote] = useState({})

const handleRegisterContrato = async () => {
 
 
  const path = `contratos/lote/${lote.id}`
await  registerContratoApi({...data, 
    inicio: (new Date()), 
    fecha: (new Date()),
    pagado:0, 
    estatus: 0, 
    usuarioId: id, 
    clientesId: itemfind ,
    contratoId: lote.id ,
    comision: 0,
    loteId: lote.id}
    ,path)
}
const handleOpenLote = (loteid:number) => {
  onOpen()
  setLote(loteid)
 
}


  return (
    <div className="bg-white gap-3 grid grid-cols-2 sm:grid-cols-4 p-5">
      {lotes.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md p-0 w-52 h-60" key={index} isPressable onPress={()=>handleOpenLote(item)}>
          <CardBody className=" p-0">
            <CldImage
            className='w-auto h-auto p-1 bg-gray-950/5'
            alt=''
            width="300"
            height="300"
            src={`Logos/${item.clave.slice(0,-4)}`}/>
          <CardFooter className=" bg-slate-200/25 flex gap-3 text-small justify-between h-auto p-2">
            <h1 className='text-black drop-shadow-md shadow-red-900' > {item.clave} </h1>
            <h2> {item.m2} m²</h2>
          </CardFooter>
          </CardBody>
        
        </Card>
        
      ))}

  <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} >
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary"></p></ModalHeader>
              <ModalBody className="text-black " >
				
				
				<Input
              value={lote.costo}
              defaultValue={lote.costo}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Costo de la propiedad"
			  description = ""
             variant='bordered'
              name="costo"
              id="costo"
            />
				<Input
              value={lote.m2}
              defaultValue={lote.m2}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Metros Cuadrados de la propiedad"
			  description = ""
             variant='bordered'
              name="m2"
              id="m2"
            />
				
				<Input
              value={data.testigo1}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="El nombre del primer testigo"
			  description = "Escriba el nombre"
             variant='bordered'
              name="testigo1"
              id="testigo1"
            />
			
			<Input
              value={data.testigo2}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="El nombre del segundo testigo"
			  description = "Escriba el nombre"
             variant='flat'
              name="testigo2"
              id="testigo2"
            />
			<Input
              value={(data.pagosafinanciar).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Pagos a financiar"
			  description = "Escriba los meses"
             variant='flat'
              name="pagosafinanciar"
              id="pagosafinanciar"
            />
			<Input
              value={(data.interesanual).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Interes anual"
			  description = "Escrba la tasa anual"
             variant='flat'
              name="interesanual"
              id="interesanual"
            />
			<Input
              value={(data.enganche).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Enganche"
			  description = "Escriba el monto"
             variant='flat'
              name="enganche"
              id="enganche"
            />
			<Input
              value={(data.preciom2).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Precio de cada metro cuadrado"
			  description = "Precio unitario de metro cuadrado"
             variant='flat'
              name="preciom2"
              id="preciom2"
            />
			


              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleRegisterContrato}>
                  Registrar Contrato
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      
    
    </div>

    
  );
      }
export default Contrato