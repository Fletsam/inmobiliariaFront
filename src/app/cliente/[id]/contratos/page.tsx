"use client"
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import useGetClientebyId from '../../hooks/useGetClientebyId'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Button, Card, CardBody, CardFooter, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import useLotes from '@/app/lotes/hooks/useGetLotes'
import useRegisterContrato from './hooks/useRegisterContrato'
import { CldImage } from 'next-cloudinary'
import NavbarInicio from '@/components/navbar'
import useFraccs from '@/app/fraccionamientos/hooks/useGetFracc'

const Contrato = () => {
const params = useParams()
const itemfind = (parseInt(params.id))
const [selectedOption , setSelectedOption]  = useState<string>("Lotes") 
const {startLoadingClientes,dataCliente,cliente} = useGetClientebyId()
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)
const {lotesVendidos,startLoadingLotes,dataLotes} = useLotes()
const {dataFracc,fraccs,startLoadingFraccs} = useFraccs()
const lotes = lotesVendidos

const {data, handleSetData,registerContratoApi} = useRegisterContrato()

const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
const param = `clientes/${itemfind}`

useEffect(() => {
  startLoadingClientes(param)
	
}, [dataCliente])
useEffect(() => {
  const param = `lotes/disponibles`
  startLoadingLotes(param)
	
}, [dataLotes])
useEffect(() => {
  const param = `lotes/disponibles`
  startLoadingLotes(param)
	
}, [dataLotes])
useEffect(() => {
  const param = `fraccionamientos/usuario/${id}`
  startLoadingFraccs(param)  
  
}, [dataFracc])

const [lote , setLote] = useState({})
const options = fraccs
const handleRegisterContrato = async () => {
  const path = `contratos/lote/${lote.id}`
  console.log(data);
  
  await  registerContratoApi({...data, 
    enganche: Number(data.enganche),
    comision : Number(data.comision),
    preciom2 : Number(data.preciom2),
    inicio: (new Date()), 
    fecha: (new Date()),
    usuarioId: id,   
    clientesId: itemfind ,
    contratoId: lote.id ,
    loteId: lote.id}
    ,path)
    onClose()
    }

const handleOpenLote = (loteid:number) => {
  onOpen()
  setLote(loteid)
}


const filteredData = lotes.filter(item => item.clave.slice(0,-3).includes(selectedOption));

 
 
return (
    <main>
      <NavbarInicio>
      <Tabs
      className="max-w-xs text-white pt-5"
      disableSelectorIconRotation
      onSelectionChange={setSelectedOption}
      selectedKey={selectedOption}
      color='primary'
    >
      {options?.map((option) => (
        <Tab className='text-white'  key={option.clave} value={option.clave} title={option.nombre}>
        </Tab>
      ))}
     </Tabs>
      </NavbarInicio>
      <div className="bg-white">
      <Button>
        Ver Lotificacion
      </Button>
	  <div className='bg-white gap-3 grid grid-cols-1 justify-items-center sm:grid-cols-4 p-5'>
       {filteredData.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md p-0 w-52 h-60" key={index} isPressable onPress={()=>handleOpenLote(item)}>
          <CardBody className=" p-0">
            <CldImage
            className='w-auto h-auto p-1 bg-gray-950/5'
            alt=''
            width="300"
            height="300"
            src={`Logos/${item.clave.slice(0,-3)}`}/>
          <CardFooter className=" bg-slate-200/25 flex gap-3 text-small justify-between h-auto p-2">
            <h1 className='text-black drop-shadow-md shadow-red-900' > {item.clave} </h1>
            <h2> {item.m2} m²</h2>
          </CardFooter>
          </CardBody>
        </Card>
      ))}
		</div>
	
  <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} className='h-[80vh]' scrollBehavior='inside' >
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">Contrato al Lote {lote.clave}</p></ModalHeader>
              <ModalBody className="text-black " >
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
			
			
        <Input
              value={(data.enganche).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Enganche"
			  description = "Monto del enganche"
             variant='flat'
              name="enganche"
              id="enganche"
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
              value={(data.comision).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Enganche"
			  description = "Escriba el monto"
             variant='flat'
              name="comision"
              id="comision"
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
    </main>
    

    
  );
      }
export default Contrato