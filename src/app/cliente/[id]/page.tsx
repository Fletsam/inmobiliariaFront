"use client"
import NavbarInicio from '@/components/navbar'
import React, { useCallback, useEffect, useState } from 'react'
import useGetClientebyId from '../hooks/useGetClientebyId'
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { Button, Card, CardBody, CardFooter, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import Contrato from './contratos/page'
import { ContratoPDF } from './contratos/contratopdf/contrato'
import useRegisterInversion from './contratos/hooks/useRegisterInversion'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import DatePicker, { registerLocale } from "react-datepicker";
import { cn } from '@/lib/utils'
import 'moment/locale/es';
import { es } from 'date-fns/locale/es';
import 'moment/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'



const options = [
  {
    label: "Contratos" , 
    value:  "Contratos"
  },
  {
    label: "Inversiones" , 
    value:  "Inversiones"
  },
  {
    label: "Propiedades" , 
    value:  "Propiedades"
  }

]


const page = () => {

const params = useParams()
const itemfind = (parseInt(params.id))
const {dataCliente, startLoadingClientes, cliente,clienteContratos} = useGetClientebyId()
const {data, handleSetData, handleSetDate, registerInversionApi} =useRegisterInversion()
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)
const [selectedOption , setSelectedOption]  = useState<string>("Lotes") 
registerLocale('es', es)
moment.locale("es")



useEffect(() => {
    const pathpag = `clientes/${itemfind}`
    startLoadingClientes(pathpag)

}, [dataCliente])

const Lotes = clienteContratos.map((clientecontrato)=> clientecontrato.Lote)

const router = useRouter()
let numeral = require('numeral');
const handleToEstadoCuentaLote = (id:number) => {
    router.push(`/estadocuenta/cliente/${id}`)
}
const handleToEstadoCuentaInv = (id:number) => {
    router.push(`/estadocuenta/inversionista/${id}`)
}

const handleRegisterInversion = async () => {
 
 
  const path = `contratos/inversionista/${cliente.id}`
    console.log(data);
    
  await  registerInversionApi({...data,
    monto: Number(data.monto),
    comision: Number(data.comision),
    clientesId: cliente.id,
    usuarioId: id,
    nombre: cliente.nombre
}
    ,path)
}
const Cards = useCallback(() =>{  
switch (selectedOption) {
  case "Contratos":
   return ( 
    <div >
        <div className='md:grid md:gap-5 md:grid-cols-2 justify-items-center grid gap-2 '>
      {Lotes?.map((item, index) => (
                        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md grid justify-items-center" key={index} isPressable onPress={()=>handleToEstadoCuentaLote(item.id)} >
                        
                        <CardBody className="overflow-visible p-0 grid justify-items-center">
                        <CldImage
                            alt={`${item.clave}`}
                            className=''
                            width="200"
                            height="200"
                            src={`Logos/${item.clave.slice(0,-3)}`}/>

                        </CardBody>
                        <CardFooter className="flex gap-3 text-small justify-between">
                            <b > {item.clave} </b>
                            <p className="text-default-500"> costo : $ {item.costo} mxn </p>
                            <p className="text-default-500"> m²: {item.m2} </p>
                        </CardFooter>
                    
                        </Card>
                        
                                  ))}
        </div>
    </div>
   )
   case "Inversiones": 
   return (
<div >
        <div className='md:grid md:gap-5 justify-items-center grid gap-2 w-full '>
      {cliente.ContratosInversionista?.map((item, index) => (
            <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md grid justify-items-center h-auto w-full" key={index} isPressable onPress={()=>handleToEstadoCuentaInv(item.id)} >
                <CardBody className="overflow-visible p-2">
                        <h2 className='text-primary font-semibold text-xl'>
                            Inversion
                        </h2>
                        <h3 className='text-primary font-semibold text-large'>
                            Monto: <p className='text-black font-normal text-base'> {numeral(item.monto).format('$0,0')} Mxn </p>
                        </h3>
                        <h3 className='text-primary font-semibold text-large'>
                            Meses: <span className='text-black font-normal text-base'>{item.pagosafinanciar} meses </span>
                        </h3>
                </CardBody>
                <CardFooter className="flex gap-3 text-small justify-between">
                    <p className="text-default-500"> {item.nombre}</p>
                </CardFooter>
            </Card>        
            ))} 
        </div>
    </div>
   ) 
}
},[selectedOption, Lotes])
 



  return (
    <main className='text-black '>
        <div className=' w-screen  md:block  '><NavbarInicio>
            <Tabs
      className="max-w-xs text-white pt-5"
      disableSelectorIconRotation
      onSelectionChange={setSelectedOption}
      selectedKey={selectedOption}
      color='primary'
    >
      {options?.map((option) => (
        <Tab className='text-white'  key={option.value} value={option.value} title={option.value}>
        </Tab>
      ))}
     </Tabs>
        </NavbarInicio>
            </div>
        <section className='bg-slate-200 w-full md:flex md:gap-5'>
            <div className=' bg-slate-200 md:w-1/2 bg-slate-white md:grid  flex-col justify-center'>
            <div className='bg-white/5 h-1/3 grid justify-items-center'>
            <div className='md:w-1/2 h-auto grid-cols-1 justify-items-center'>
                <div className='flex justify-items-center'>
                <CldImage
            alt={`${cliente.id}`}
            className='w-60 h-60 rounded-full mx-auto shadow-black drop-shadow-md'
            width={400}
            height={400}
            src={`Clientes/cliente`}/>
            <div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black '>
                <h1 className='text-primary font-bold'>
                    Nombre : <span className='text-black font-normal'> {cliente.nombre} </span>
                </h1>
                <h1 className='text-primary font-bold'>
                    Telefono : <span className='text-black font-normal'> {cliente.telefono} </span>
                </h1>
                <h1 className='text-primary font-bold'>
                    CURP : <span className='text-black font-normal'> {cliente.curp} </span>
                </h1>
                <h1 className='text-primary font-bold'>
                    Estado Civil : <span className='text-black font-normal'> {cliente.estadocivil} </span>
                </h1>
                    
                </div>
                </div>
            <div className='flex pt-4 justify-between gap-5'>
                <Link href={`${cliente.id}/editar`}>
                <Button className='text-white bg-primary shadow-md shadow-primary'>
                  Editar
                </Button>
                </Link>
                <Link href={`${cliente.id}/contratos`}>
                <Button className='text-white bg-primary shadow-md shadow-primary'>
                  Contrato
                </Button>
                </Link>
                <Button className='text-white bg-primary shadow-md shadow-primary' onClick={onOpen}>
                  Invertir
                </Button>
            </div>
            </div>
            <div className=' h-auto w-auto pt-10 justify-items-center'>
                <div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black w-auto '>
                <div className='p-2 w-auto'>
                <h1 className='text-primary text-2xl font-bold'>
                    Direccion
    
                </h1>
                <h1 className='text-primary font-bold'>
                    Colonia : <span className='text-black font-normal'> {cliente.colonia}  </span>
                </h1>
                <h1 className='text-primary font-bold'>
                    Calle :  <span className=' text-black font-normal'> {cliente.calle} </span>
                </h1>
                <h1 className='text-primary font-bold flex justify-between'>
                    Numero Exterior : <span className='text-black font-normal'>{cliente.numeroext}° </span>
                    Numero Interior : <span className='text-black font-normal'>{cliente.numeroint}° </span>
                </h1>
                <h1 className='text-primary font-bold'>
                    Codigo Postal : <span className='text-black font-normal'> {cliente.cp} </span>
                </h1>
                </div>
                <div className='p-2'>
                    <h1 className='text-primary font-bold text-2xl'>
                        Trabajo
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Ocupación : <span className='text-black font-normal'> {cliente.ocupacion} </span>
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Lugar de Trabajo : <span className='text-black font-normal'> {cliente.lugardetrabajo} </span>
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Telefono de Trabajo : <span className='text-black font-normal'> {cliente.telefonodetrabajo} </span>
                    </h1>
                </div>
                <div className='p-2'>
                    <h1 className='text-primary font-bold text-2xl'>
                    Contacto
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Correo Electronico : <span className='text-black font-normal'> {cliente.correo} </span>
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Referencia : <span className='text-black font-normal'> {cliente.referencia} </span>
                    </h1>
                    <h1 className='text-primary font-bold'>
                    Telefono de Referencia : <span className='text-black font-normal'> {cliente.telefonodereferencia} </span>
                    </h1>	
                </div>
                </div>
            </div>

        
            </div>
            
           
            </div>
                	 <div className='bg-slate-200 md:w-1/2'>
                    <div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black justify-items-center w-auto gap-3'>
                        {Cards()}
                    </div>
                </div>
        </section>
      <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} >
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary"></p></ModalHeader>
              <ModalBody className="text-black " >
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
              value={(data.interesmensual).toString()}
              type="text"
              onChange={handleSetData}
              className='text-black'
              label="Interes Mensual"
              description = "Escrba la tasa Mensual"
             variant='flat'
              name="interesmensual"
              id="interesmensual"
            />
            <Input
              value={data.monto}
              type="text"
              onChange={handleSetData}
              className='text-black'
              label="Monto de la Inversion"
              description = "Escriba el monto"
             variant='flat'
              name="monto"
              id="monto"
            />
            <Input
              value={(data.comision).toString()}
              type="text"
              onChange={handleSetData}
              className='text-black'
              label="Monto de la comision"
              description = "monto de la comision"
             variant='flat'
              name="comision"
              id="comision"
            />
            {/* 
         <Popover className='text-black'>
                    <PopoverTrigger >
                        <Button
                        variant={"light"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !data.inicio && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4 capitalize" />
                        {data.inicio ? moment(data.inicio).format("LLL") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" >
                        <DatePicker
                            locale="es"
                            selected={data.inicio}
                            className="block w-full border-spacing-5 rounded-lg border-2 border-gray-700/40 bg-transparent px-5 py-3 font-semibold"
                            onChange={handleSetDate}
                            />
                        </PopoverContent>
                </Popover> */}
              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleRegisterInversion}>
                  Registrar Contrato
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
      

    </main>
    
  )
}

export default page