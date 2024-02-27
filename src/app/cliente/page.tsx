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
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useCliente from "./hooks/useGetClientes";
import { IoLogoReddit, IoTrash } from "react-icons/io5";
import { EyeFilledIcon } from "@/helpers";
import { TbEditCircle } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";
import ClientModal from "./components/modal";

export default function Home() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {clientes,dataCliente, startLoadingClientes,  showClient } = useCliente()

 const [cliente, setCliente] = useState({})


 const openModalCliente = (e) => {  
      setCliente(e)
      console.log(e);
      
  }

console.log(cliente);


useEffect(() => {
  startLoadingClientes()  
  
}, [dataCliente])

type Clientes = typeof clientes[0];
const columns = [
  {name: "Nombre", uid: "nombre"},
  {name: "Ocupacion", uid: "ocupacion"},
  {name: "Status", uid: "status"},
  {name: "Acciones", uid: "actions"},
];

 const renderCell = React.useCallback((clientes: Clientes, columnKey: React.Key) => {
    const cellValue = clientes[columnKey as keyof Clientes];




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
            <p className="text-bold text-sm capitalize text-default-400">{clientes.ocupacion}</p>
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
              <span className="text-lg  cursor-pointer text-success active:opacity-50" onClick={onOpen}>
                <EyeFilledIcon onClick={() => openModalCliente(clientes)}   />
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Edit user" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                <TbEditCircle />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FiDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

/* 
  const columns = [
    {
      key: "nombre",
      label: "Nombre",
    },
    {
      key: "genero",
      label: "Genero",
    },
    {
      key: "calle",
      label: "Calle",
    },

    {
      key: "numeroext",
      label: "numero exterior",
    },
    {
      key: "numeroint",
      label: "numero interior",
    },
    {
      key: "colonia",
      label: "Colonia",
    },
    {
      key: "cp",
      label: "Codigo Postal",
    },
    {
      key: "ciudad",
      label: "Ciudad",
    },
    {
      key: "estadocivil",
      label: "Estado Civil",
    },
    {
      key: "correo",
      label: "Correo Electronico",
    },
    {
      key: "telefono",
      label: "Telefono",
    },
    {
      key: "curp",
      label: "Curp",
    },
    {
      key: "ocupacion",
      label: "Ocupacion",
    },
    {
      key: "lugardetrabajo",
      label: "Lugar de Trabajo",
    },
    {
      key: "telefonodetrabajo",
      label: "Telefono de Trabajo",
    },
    {
      key: "referencia",
      label: "Referencia",
    },
    {
      key: "telefonodereferencia",
      label: "Telefono de Referencia",
    },
    {
      key:"Actions",
      label : "Actions"
    }

  ];
   */

  return (
    <main className="bg-slate-200 p-5">
      <Table className="h-[auto]">
        <TableHeader className="" columns={columns}>
          {(columns) => (
            <TableColumn
              className=" min-w-72 text-red-800 font-bold text-base"
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
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
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
                      Ocupacion: <span className="text-black"> {cliente.ocupacion} </span>
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
