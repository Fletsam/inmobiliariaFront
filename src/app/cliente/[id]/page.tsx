"use client"
import NavbarInicio from '@/components/navbar'
import React, { useEffect } from 'react'
import useGetClientebyId from '../hooks/useGetClientebyId'
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react'
import Link from 'next/link'

const page = () => {

	
	const params = useParams()
const itemfind = (parseInt(params.id))

	const {dataCliente, startLoadingClientes, cliente,clienteContratos} = useGetClientebyId()

useEffect(() => {
	const pathpag = `clientes/${itemfind}`
	startLoadingClientes(pathpag)

}, [dataCliente])

const Lotes = clienteContratos.map((clientecontrato)=> clientecontrato.Lote)

const router = useRouter()

const handleToEstadoCuenta = (id:number) => {
	router.push(`/estadocuenta/cliente/${id}`)
}

  return (
	<main className='text-black '>
		<div className=' w-screen  md:block  '><NavbarInicio/>
			</div>
		<section className='bg-white w-full md:flex'>
			<div className=' bg-slate-200 md:w-1/2 bg-slate-white md:grid  flex-col justify-center'>
			<div className='bg-white/5 h-1/3 md:flex grid justify-items-center'>
			<div className='bg-slate-200 w-1/2 h-min p-2 flex md:justify-center'>
			<CldImage
            alt={`${cliente.id}`}
            className='w-60 h-60 rounded-full mx-auto shadow-black drop-shadow-md'
            width={400}
            height={400}
            src={`Clientes/cliente`}/>
			</div>
			<div className='md:w-1/2 h-auto pt-10'>
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
			<div className='flex pt-4 justify-center'>
				<Link href={`${cliente.id}/editar`}>
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
				<div className='bg-slate-200 md:w-1/2'>
					<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black grid md:grid-cols-2 gap-3'>
						{Lotes?.map((item, index) => (
						<Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md grid justify-center" key={index} isPressable onPress={()=>handleToEstadoCuenta(item.id)} >
						
						<CardBody className="overflow-visible p-0 ">
						<CldImage
							alt={`${item.clave}`}
							className=''
							width="300"
							height="300"
							src={`Logos/${item.clave.slice(0,-4)}`}/>

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
		</section>



	</main>
  )
}

export default page