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
  Chip,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SortDescriptor,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useCliente from "./hooks/useGetClientes";
import { IoLogoReddit, IoNewspaper, IoNewspaperOutline, IoPersonCircle, IoSearchOutline, IoTrash, IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import { EyeFilledIcon } from "@/helpers";
import { TbEditCircle } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";
import moment from "moment";
import 'moment/locale/es';
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import useDeleteCliente from "./hooks/useDeleteCliente";
import axios from "axios";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";







export default function Home() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {clientes,dataCliente, startLoadingClientes,  showClient } = useCliente()

   const {startDeleteCliente } = useDeleteCliente()

const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 

  const router = useRouter() 
const Swal = require('sweetalert2')
 const [cliente, setCliente] = useState({})
 

 const param = `clientes/usuario/${id}`
 useEffect(() => {
  
  startLoadingClientes(param)  
  
}, [dataCliente])


 
 const DeleteCliente = async (id:number) => {
    const pathPag = `clientes/${id}`
 
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

        startDeleteCliente(pathPag)
        startLoadingClientes(param)  
        }
      
});
 
 }

 const openModalCliente = (e:number) => {  
      setCliente(e)    
  }





type Clientes = typeof clientes[0];
const columns = [
  {name: "Nombre", uid: "nombre",sortable:true},
  {name: "Ocupación", uid: "ocupacion"},
  {name: "Acciones", uid: "actions"},
];
  
 const renderCell = React.useCallback((clientes: Clientes, columnKey: React.Key) => {
    const cellValue = clientes[columnKey as keyof Clientes];

    
    moment.locale("es")

 switch (columnKey) {
      case "name":
        return (
          <Clientes
            description={clientes.nombre}
            name={cellValue}
          >
            {clientes.correo}
          </Clientes>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{ clientes.ocupacion}</p>
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
            <Tooltip content="Detalles" color="success" className="text-white">
              <span className="text-2xl  cursor-pointer text-success active:opacity-50" onClick={onOpen}>
                <EyeFilledIcon onClick={() => openModalCliente(clientes)}   />
              </span>
            </Tooltip>
            <Tooltip content="Ficha del Cliente" color="secondary" className="text-white">
              <span className="text-2xl  cursor-pointer text-secondary active:opacity-50">
                <Link href={`/cliente/${clientes.id}`}>
                <IoPersonCircle />
                </Link>
                
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Editar Cliente" className="text-white">
              <span className="text-2xl text-warning cursor-pointer active:opacity-50">
                <Link href={`/cliente/${clientes.id}/editar`}>
                  <TbEditCircle />
                </Link>
                
              </span>
            </Tooltip>
            <Tooltip color="default" content="Contratos" className="text-blue-600">
              <span className="text-2xl text-blue-600 cursor-pointer active:opacity-50">
                <Link href={`/cliente/${clientes.id}/contratos`}>
                  <IoNewspaper color="primary" />
                </Link>
                
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Borrar Cliente">
              <span className="text-2xl text-danger cursor-pointer active:opacity-50">
                <IoTrashOutline onClick={() => DeleteCliente(clientes.id) } />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);



  return (
    <main className="bg-slate-200 p-5">
      
          <div className="flex flex-1 justify-between">
            <Input
            isClearable
            className="w-full sm:max-w-[44%] text-black"
            placeholder="Search by name..."
            startContent={<IoSearchOutline className=" text-black"/>}
  /*                       value={filterValue}
                         onValueChange={onSearchChange}
 */
          />

            <Button
		  	    color='success'
            id="create-btn"
			      className='text-white bg-primary shadow-md shadow-primary '
			      onClick={()=> router.push("/cliente/registrar")}
            > 
              Registrar un Cliente
            </Button>
		
          </div>


      <Table 
      className="h-[90vh] w-[auto] p-5"
      >
          
        <TableHeader className=" " columns={columns}>
          {(columns) => (
            <TableColumn
              allowsSorting={columns.sortable}
              className=" min-w-40 text-red-800 font-bold text-base"
              key={columns.uid}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className="text-black  font-semibold" items={clientes}>
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
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">Cliente</p></ModalHeader>
              <ModalBody className="text-black " >
					     <section className="grid grid-rows">
                <h1 className="text-primary font-bold">Informacion Personal</h1>
                 <div className="flex row-span-1 p-1">
                  
                     
                    <div>
                       <h3 className="text-primary pt-1">
                        Nombre : <span className="text-black">{cliente.nombre}</span>
                      </h3>
                      <h3 className="text-primary pt-1">
                        Genero : <span className="text-black">{cliente.genero}</span>
                      </h3>
                      <h3 className="text-primary pt-1">
                        Estado Civil : <span className="text-black">{cliente.estadocivil}</span>
                      </h3>
                      <h3 className="text-primary pt-1">
                        Telefono : <span className="text-black">{cliente.telefono}</span>
                      </h3>
                      <h3 className="text-primary pt-1">
                        Correo : <span className="text-black">{cliente.correo}</span>
                      </h3>
                    
                    </div>
                    <div>
                    <h3 className="text-primary pt-1">
                      Referencia: <span className="text-black">{cliente.referencia}</span>
                    </h3>
                    <h3 className="text-primary pt-1">
                      Telefono de Referencia:<span className="text-black">{cliente.telefonodereferencia}</span>
                    </h3>
                    </div>
                </div>
                <div className="flex row-span-2">
                <div className="">
                    <h1 className="text-primary pt-1 font-bold">Trabajo</h1>
                    <h3 className="text-primary pt-1">
                      Ocupacion: <span className="text-black"> { cliente.ocupacion} </span>
                    </h3>
                    <h3 className="text-primary pt-1">
                      Lugar de Trabajo: <span className="text-black"> {cliente.lugardetrabajo} </span>
                    </h3>
                    <h3 className="text-primary pt-1">
                      Telefono de Trabajo: <span className="text-black">  {cliente.telefonodetrabajo} </span>
                    </h3>
                      
                  </div>
                <div className="">
                    <h1 className="text-primary pt-1 font-bold">Direccion</h1>
                     <h3 className="text-primary pt-1 ">
                      Ciudad : <span className="text-black" >{cliente.ciudad}</span>
                     </h3 >
                      <h3 className="text-primary pt-1 ">
                        Calle : <span className="text-black" >{cliente.calle}</span> <span className="text-black"></span> <span className="text-black" >{cliente.numeroext}</span>
                      </h3 >
                      <h3 className="text-primary pt-1 ">
                        Colonia :  <span className="text-black" >{cliente.colonia}</span>
                      </h3 >
                      <h3 className="text-primary pt-1 ">
                         Codigo Postal : <span className="text-black" >{cliente.cp}</span>
                      </h3 >
                      
                </div>
                </div>
                <h3 className="text-primary pt-5 ">
                        Fecha de Creacion :  <span className="text-black font-semibold"> {moment(cliente.fhcreacion).format("Do MMMM YYYY").toUpperCase()} </span> 
                      </h3>
                </section> 
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

           
    </main>
  );
}
