"use client";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Tooltip,
  Chip,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { IoAdd, IoSearchOutline, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import { EyeFilledIcon } from "@/helpers";
import moment from "moment";
import { formatPrecio } from "@/helpers/formatearprecios";
import { formatters } from "date-fns";
import { TbEditCircle } from "react-icons/tb";
import useGetFraccbyId from "../../hooks/useGetFraccbyId";
import { useParams, useRouter } from "next/navigation";
import useRegisterManzana from "@/app/manzanas/hooks/useRegisterManzana";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useFraccs from "../../hooks/useGetFracc";
import Lotes from "@/app/lotes/page";
import useRegisterLote from "@/app/lotes/hooks/useRegisterLote";
import useDeleteLote from "@/app/lotes/hooks/useDeleteLote";


const ClienteId = () => {
const params = useParams();
const itemfind  = (parseInt(params.id));
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)	
const {startLoadingFracc,dataFracc,fracc,manzanas,lotes } = useGetFraccbyId()	
const {isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();
const {handleSetData ,data ,registerLoteApi} = useRegisterLote()
const {DeleteLoteApi,startDeleteLote,statusDeleteLote} = useDeleteLote()


const param = `fraccionamientos/${itemfind}/usuario/${id}`

const router = useRouter()

useEffect(() => {
  
  startLoadingFracc(param)  

}, [dataFracc])



const Swal = require('sweetalert2')






/* if (!llave){
    throw Swal.fire({
  title: 'Aqui no puedes estar',
  text: 'Regresa a la pantalla de inicio',
  icon: 'warning',
  confirmButtonText: 'OK'
})
  } */


const handleAddLote = async () => {

	await registerLoteApi({...data , usuarioId: id, fraccionamientoId: itemfind, costototal: 0, contratoId:0})
	onClose()
  
}
const handleDeleteLote = (e:number) => {
  const param = `lotes/${e}`
 
	 Swal.fire({
        title: "Estas Seguro?",
        text: "Esto no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then((result:any) => {
        if (result.isConfirmed) {
        startDeleteLote(param)
        startLoadingFracc(param)
        } 
        
})}


type Lotes = typeof lotes[0];
const columns = [
	{name : "Numero de Manzana" , uid: "manzanaId"},
	{name: "Numero de Lote", uid: "numero"},
  {name: "Clave de Lote", uid: "clave"},
  {name: "Costo Total", uid: "costo"},
/*   {name: "Telefono", uid: "telefono"},
  {name: "Direccion", uid: "direccion"},
  {name: "Total de lotes", uid: "totaldelotes"},
  {name: "Total de Manzanas", uid: "totaldemanzanas"},
  {name: "Costo", uid: "costototal"}, */
  {name: "Acciones", uid: "actions"},
];
  let numeral = require('numeral');

const [lote, setLote] = useState({})

/* const openModalFracc = (e:number) => {  
      setFracc(e)    
  } */

 const renderCell = React.useCallback((lotes: Lotes, columnKey: React.Key) => {
    const cellValue = lotes[columnKey as keyof Lotes];






 switch (columnKey) {
      case "name":
        return (
          <Lotes
            description={lotes.nombre}
            name={cellValue}
          >
            {/* {fraccs.propietario} */}
          </Lotes>
        );
      case "costo":
          const costo = numeral(cellValue).format('$0,0')
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{costo}mxn</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize"  size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" color="success" className="text-white">
              <span className="text-lg  cursor-pointer text-success active:opacity-50" /* onClick={onOpen} */>
                {/* <EyeFilledIcon onClick={() => openModalFracc(fraccs)}   /> */}
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Edit user" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                {/* <Link href={`/cliente/${manzanas.id}`}>
                  <TbEditCircle onClick={() => showClient(fraccs) } />
                </Link> */}
                
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Borrar Lote">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <IoTrashOutline onClick={() => handleDeleteLote(lotes.id) } />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  
  
  return (
    <main className="bg-slate-200 p-5 text-black">
      
            <Input
            isClearable
            className="w-full sm:max-w-[44%] text-black"
            placeholder="Search by name..."
            startContent={<IoSearchOutline className=" text-black"/>}
  /*                       value={filterValue}
                         onValueChange={onSearchChange}
 */
          />
		  <div className="flex flex-1 justify-between">
		<h1 className="text-primary font-semibold text-2xl pt-2"> {fracc.nombre} </h1>
				  <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onOpen}>
                  Agregar Lote
                </Button>
			
		  </div>
			
	
      <Table 
      className="h-[90vh] w-[auto] p-5"
      >   
	  
        <TableHeader className=" " columns={columns}>
          {(columns) => (
            <TableColumn
              className=" min-w-50 text-red-800 font-bold text-base"
              key={columns.uid}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className="text-black font-semibold" items={lotes}>
          {(item) => (
            <TableRow
              className="shadow-slate-200 border text-black"
              key={item.id|| 0}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
              
            </TableRow>
          )}
        </TableBody>
      </Table>

	   
      <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary"></p></ModalHeader>
              <ModalBody className="text-black " >
				
				
				<Input
              value={(data.manzanaId).toString()}
              type="number"
              onChange={handleSetData}
			  className='text-black'
              label="Añadir en la Manzana"
			  description = "Escriba el numero de Manzana"
             variant='bordered'
              name="manzanaId"
              id="manzanaId"
            />
				
				<Input
              value={data.numero}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Añadir una Lote"
			  description = "Escriba el numero de Lote"
             variant='bordered'
              name="numero"
              id="numero"
            />
			
			<Input
              value={(data.costo).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escriba el costo del Lote"
			  description = "Escriba el costo del lote"
             variant='flat'
              name="costo"
              id="costo"
            />
			<Input
              value={(data.m2).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escriba los metros cuadrados del Lote"
			  description = "Escriba los metros cuadrados del lote"
             variant='flat'
              name="m2"
              id="m2"
            />
			


              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleAddLote}>
                  Agregar Lote
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>


    </main>
  );
}

export default ClienteId