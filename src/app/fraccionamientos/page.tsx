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
} from "@nextui-org/react";
import React, { useEffect } from "react";
import useFraccs from "./hooks/useGetFracc";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";


export default function Fraccionamiento() {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingFraccs,dataFracc, fraccs } = useFraccs()

useEffect(() => {
  startLoadingFraccs()  
  
}, [dataFracc])

type Fraccs = typeof fraccs[0];
const columns = [
  {name: "Nombre", uid: "nombre",sortable:true},
  {name: "Propietario", uid: "propietario"},
  {name: "Telefono", uid: "telefono"},
  {name: "Direccion", uid: "direccion"},
  {name: "Total de lotes", uid: "totaldelotes"},
  {name: "Total de Manzanas", uid: "totaldemanzanas"},
  {name: "Costo", uid: "costototal"},
  
  {name: "Acciones", uid: "actions"},
];
  
 const renderCell = React.useCallback((fraccs: Fraccs, columnKey: React.Key) => {
    const cellValue = fraccs[columnKey as keyof Fraccs];


 switch (columnKey) {
      case "name":
        return (
          <Fraccs
            description={fraccs.nombre}
            name={cellValue}
          >
            {/* {fraccs.propietario} */}
          </Fraccs>
        );
      case "propietario":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
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
                {/* <EyeFilledIcon onClick={() => openModalCliente(fraccs)}   /> */}
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Edit user" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                <Link href={`/cliente/${fraccs.id}`}>
                  {/* <TbEditCircle onClick={() => showClient(fraccs) } /> */}
                </Link>
                
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                {/* <FiDelete onClick={() => DeleteCliente(fraccs.id) } /> */}
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);






  console.log(fraccs);
  


  return (
    <main className="bg-slate-200 p-5">
      
            <Input
            isClearable
            className="w-full sm:max-w-[44%] text-black"
            placeholder="Search by name..."
            startContent={<IoSearchOutline className=" text-black"/>}
  /*                       value={filterValue}
                         onValueChange={onSearchChange}
 */
          />
          <div className="flex gap-3"></div>


      <Table 
      className="h-[90vh] w-[auto] p-5"
      >   
        <TableHeader className=" " columns={columns}>
          {(columns) => (
            <TableColumn
              className=" min-w-72 text-red-800 font-bold text-base"
              key={columns.uid}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className="text-black  font-semibold" items={fraccs}>
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
