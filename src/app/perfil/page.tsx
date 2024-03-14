"use client"
import NavbarInicio from '@/components/navbar'
import React, { useCallback, useEffect, useState } from 'react'
import 'moment/locale/es';
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { Button, Card, CardBody, CardFooter, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Tab, Tabs, Tooltip, useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import useGetClientebyId from '@/app/cliente/hooks/useGetClientebyId'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useGetUsuariobyId from './hooks/useGetUser'
import useRegisterFuncion from './hooks/useRegisterFuncion'
import { AlertCircleIcon, BadgeCheckIcon, CalendarIcon } from 'lucide-react'
import { format } from 'path'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/Calendar'
import { formatDate } from 'date-fns'
import { registerLocale } from 'react-datepicker'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import moment from 'moment'
import { IoCheckmarkCircle } from 'react-icons/io5';
import usePatchFuncion from './hooks/usePatchSesion';

const options = [
  {
    label: "Cliente" , 
    value:  "Cliente"
  },
  {
    label: "Funciones" , 
    value:  "Funciones"
  },
  {
    label: "Propiedades" , 
    value:  "Propiedades"
  }

]



const Perfil = () => {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const {startLoadingUsuario,dataUsuario,usuario,area,funciones} = useGetUsuariobyId()
	const { dataCliente, startLoadingClientes, clientes} = useGetClientebyId()
	const { isLogged, nombre,id } = useSelector((state: RootState) => state.users); 
	const {handleSetData,handleSetDate,registerFuncionApi, data} = useRegisterFuncion()
	const {patchFuncionApi, dataEdit} = usePatchFuncion()
	const [selectedOption , setSelectedOption]  = useState<string>("Funciones") 
registerLocale('es', es)
moment.locale("es")


useEffect(() => {
	const pathpag = `usuarios/${id}`
	startLoadingUsuario(pathpag)

}, [dataUsuario])
useEffect(() => {
	const pathpag = `clientes/usuario/${id}`
	startLoadingClientes(pathpag)

}, [dataCliente])

var numeral = require('numeral');
const router = useRouter()

const handleRegisterFuncion = () => {
	console.log(data);
	
	registerFuncionApi({...data , areaId: area.id , usuarioId : id})
}
const handleChangeEstado=(id:number) =>{
	const param =`funciones/${id}`
	
	patchFuncionApi({...data , estado:true},param)
}

const handleToEstadoCuenta = (id:number) => {
	router.push(`/estadocuenta/cliente/${id}`)
}
 function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
     const dataId = event.target.value;
        setSelectedOption(dataId);  
  }



const Cards = useCallback(() =>{  
switch (selectedOption) {
  case "Funciones":
   
    
   return ( 
	<div >
		<div className='p-5'>
			<Button className='text-white bg-primary shadow-md shadow-primary' onClick={onOpen}>
                  Crear Tarea
            </Button>
		</div>
		<div className='grid gap-5 grid-cols-2 justify-center'>
{
		funciones?.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md" key={index} isPressable onPress={()=>handleChangeEstado(item.id)}>
          <CardBody className="overflow-visible p-0 ">
			<div className='flex justify-between'>
			<h1 className=' text-black text-2xl p-5'> {item.tarea} </h1>
			<p>{item.estado ?  
              <span className="text-4xl  cursor-pointer text-success active:opacity-50 p-5" >
                <IoCheckmarkCircle    />
              </span>
          : <span className="text-4xl  cursor-pointer text-warning active:opacity-50" >
                <AlertCircleIcon    />
              </span>}</p>
			</div>
			
          </CardBody>
          <CardFooter className="flex gap-3 text-small justify-between capitalize">
			<div className='flex justify-between'>
			<p className='text-blue-600 font-semibold'> {moment(item.fhcreacion).format('dddd, Do [de] MMMM [de] YYYY')}</p>
			<p className='text-primary font-semibold'> {moment(item.fechafin).format('dddd, Do [de] MMMM [de] YYYY')} </p>
			</div>
			

          </CardFooter>
        </Card>
      ))}
		</div>
	</div>
   ) 
    
case "Cliente":
     return ( 
		<div className='grid justify-cente md:grid-cols-2'>
				{
					clientes.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md w-60" key={index} isPressable onPress={()=> router.push(`/cliente/${item.id}`)}>
          <CardBody className="overflow-visible p-0 ">
          <CldImage
            alt={`${item.id}`}
            className='w-60 h-60'
            width="200"
            height="200"
            src={`Clientes/cliente`}/>
          </CardBody>
          <CardFooter className=" gap-3 text-small justify-between">
            <h1 className='text-primary font-bold'>
               Cliente : <span className='text-black font-normal'>{item.nombre} </span>
            </h1>
          </CardFooter>
        </Card>
      ))
   
				}
		</div>
      
   ) 
  
case "fraccs":
    
    break;
}
},[selectedOption, funciones])



  return (
	<main className='text-black '>
		<div className=' w-screen  md:block  '>
	<NavbarInicio>
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
			
		<section className='bg-white w-full md:flex'>
			
			<div className=' bg-slate-200 md:w-1/2 bg-slate-white md:grid  flex-col justify-center capitalize'>
			<div className='bg-white/5 h-1/3 md:flex grid justify-items-center'>
			<div className='bg-slate-200 w-1/2 h-min p-2 flex md:justify-center'>
			<CldImage
            alt={`${usuario.id}`}
            className='w-60 h-60 rounded-full mx-auto shadow-black drop-shadow-md'
            width={400}
            height={400}
            src={`Clientes/cliente`}/>
			</div>
			<div className='md:w-1/2 h-auto pt-10'>
				<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black '>
				<h1 className='text-primary font-bold  '>
					Nombre : <span className='text-black font-normal '> {usuario.nombre} </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Telefono : <span className='text-black font-normal '> {usuario.telefono} </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Cargo : <span className='text-black font-normal '> {usuario.cargo} </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Area : <span className='text-black font-normal '> {area.nombre} </span>
				</h1>
				</div>
			<div className='flex pt-4 justify-center'>
				<Link href={`${usuario.id}/editar`}>
				<Button className='text-white bg-primary shadow-md shadow-primary'>
                  Editar
                </Button>
				</Link>
				
			</div>
			</div>
			</div>
			<div className=' h-auto pt-10'>
				<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black '>
					<div className='p-2'>
					<h1 className='text-primary font-bold   text-2xl'>
						Trabajo
					</h1>
					<h1 className='text-primary font-bold  '>
					Area : <span className='text-black font-normal '> {area.nombre} </span>
					</h1>
					<h1 className='text-primary font-bold  '>
					Cargo : <span className='text-black font-normal '> {usuario.cargo} </span>
					</h1>
					<h1 className='text-primary font-bold  '>
					Salario : <span className='text-black font-normal '> {numeral(usuario.salario).format('$0,0')}mxn </span>
					</h1>
				</div>
				<div className='p-2'>
				<h1 className='text-primary text-2xl font-bold'>
					Direccion
				</h1>
				<h1 className='text-primary font-bold  '>
					Colonia : <span className='text-black font-normal '> {usuario.colonia}  </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Calle :  <span className=' text-black font-normal '> {usuario.calle} </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Numero :  <span className=' text-black font-normal '> {usuario.numero} </span>
				</h1>
				<h1 className='text-primary font-bold  '>
					Codigo Postal : <span className='text-black font-normal '> {usuario.cp} </span>
				</h1>
				</div>
				
				<div className='p-2'>
					<h1 className='text-primary font-bold   text-2xl'>
					Informacion
					</h1>
					<h1 className='text-primary font-bold  '>
					Correo Electronico : <span className='text-black font-normal '> {usuario.correo} </span>
					</h1>
					<h1 className='text-primary font-bold  '>
					Estado Civil : <span className='text-black font-normal '> {usuario.estadocivil} </span>
					</h1>
					<h1 className='text-primary font-bold  '>
					RFC : <span className='text-black font-normal '> {usuario.rfc} </span>
					</h1>
					<h1 className='text-primary font-bold  '>
					CURP: <span className='text-black font-normal '> {usuario.curp} </span>
					</h1>	
				</div>
				</div>
			</div>
			</div>
				<div className='bg-slate-200 md:w-1/2 '>
					<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black gap-3 '>
						{Cards()}
					</div>
				</div>	
		</section>

<>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">Cliente</p></ModalHeader>
              <ModalBody className="text-black " >
				<Input
						value={data.tarea}
						type="text"
						onChange={handleSetData}
						className='text-black'
						label="Añadir Nueva Tarea"
						description = "Escriba su nueva tarea"
						variant='bordered'
						name="tarea"
						id="tarea"
						/>
				<Popover className='text-black'>
					<PopoverTrigger >
						<Button
						variant={"light"}
						className={cn(
							"w-[240px] justify-start text-left font-normal",
							!data.fechafin && "text-muted-foreground"
						)}
						>
						<CalendarIcon className="mr-2 h-4 w-4 capitalize" />
						{data.fechafin ? moment(data.fechafin).format("LLL") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" >
						<DatePicker
							locale="es"
							selected={data.fechafin}
							className="block w-full border-spacing-5 rounded-lg border-2 border-gray-700/40 bg-transparent px-5 py-3 font-semibold"
							onChange={handleSetDate}
							/>
						</PopoverContent>
				</Popover>
				
              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleRegisterFuncion}>
                  Registrar
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

export default Perfil