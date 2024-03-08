"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useFraccs from '@/app/fraccionamientos/hooks/useGetFracc'
import useGetFraccbyId from '@/app/fraccionamientos/hooks/useGetFraccbyId'
import { Button, Card, CardBody, CardFooter, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import useLotes from '@/app/lotes/hooks/useGetLotes'
import useGetClientebyId from '../cliente/hooks/useGetClientebyId'
import useRegisterContrato from '../cliente/[id]/contratos/hooks/useRegisterContrato'
import NavbarInicio from '@/components/navbar'
import axios from 'axios'
import useGetImages from '../hooks/useGetImages'
import { CldImage } from 'next-cloudinary';
import useGetContratobyId from './hooks/useGetContrato'


const options = [
  {
    label: "Cliente" , 
    value:  "cliente"
  },
  {
    label: "Lotes" , 
    value:  "lotes"
  },
  {
    label: "Fraccionamientos" , 
    value:  "fraccs"
  }

]



const Contrato = () => {
const params = useParams()
const itemfind = (parseInt(params.id))

const {startLoadingClientes,dataCliente,cliente, clientes,clientesContratos} = useGetClientebyId()
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)
const {lotesVendidos,startLoadingLotes,dataLotes} = useLotes()
const {startLoadingContrato,dataContrato,contratos} = useGetContratobyId()


const [selectedOption , setSelectedOption] = useState<string>("lotes")
const lotes = lotesVendidos
const lotesUsuario = lotes.filter((lote)=> lote.usuarioId == id )
const router = useRouter()

useEffect(() => {
  const param = `lotes/vendidos`
  startLoadingLotes(param)
	
  }, [dataLotes])

useEffect(() => {
  const param = `contratos`
  startLoadingContrato(param)
	
  }, [dataContrato])

useEffect(() => {
  const param = `clientes/usuario/${id}`
  startLoadingClientes(param)
	
}, [dataCliente])

const allContratos = [].concat(clientesContratos[1]).concat(clientesContratos[0]) 

  function handleSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
     const dataId = event.target.value;
        setSelectedOption(dataId);  
  }
 
const handleToEditCliente = (item) =>{

  router.push(`cliente/${item.id}/editar`)  
}



const Cards = useCallback(() =>{  
switch (selectedOption) {
  case "lotes":
   
    
   return ( 
   
      lotesUsuario?.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md" key={index} isPressable /* onPress={()=>handleOpenLote(item)} */>
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
      ))
   
   ) 
    
case "cliente":
     return ( 
      clientes.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md w-auto" key={index} isPressable onPress={()=>handleToEditCliente(item)}>
          <CardBody className="overflow-visible p-0 ">
          <CldImage
            alt={`${item.clienteId}`}
            className=''
            width="400"
            height="400"
            src={`Clientes/cliente`}/>
          </CardBody>
          <CardFooter className=" gap-3 text-small justify-between">
            <h1 className='text-primary font-bold'>
               Cliente : <span className='text-black font-normal'>{item.nombre} </span>
            </h1>
          </CardFooter>
        </Card>
      ))
   
   ) 
  
case "fraccs":
    
    break;
}
},[selectedOption,lotesUsuario])



  return (
	<main>
		<NavbarInicio>
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      labelPlacement="outside"
      className="max-w-xs"
      disableSelectorIconRotation
      onChange={handleSelectionChange}
      value={selectedOption}
      
    >
      {options?.map((option) => (
        <SelectItem className='text-black' key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
     </Select>
    </NavbarInicio>
	<div className="bg-white gap-3 grid grid-cols-1 sm:grid-cols-4 p-5 absolute  justify-center align-middle">
    {Cards()}
        </div>
	</main>
 


    
  );
      }
export default Contrato