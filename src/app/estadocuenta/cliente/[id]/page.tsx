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
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { EyeFilledIcon } from "@/helpers";
import useGetEstadoCuenta from "../../hooks/useGetEstadoCuenta";
import { useParams } from "next/navigation";


export default function Fraccionamientos() {
	const params = useParams();
const itemfind  = (parseInt(params.id));
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingEstadoCuenta,estadoCuenta,dataEstadoCuenta,ingresos,egresos } = useGetEstadoCuenta()



useEffect(() => {
  const param = `estadocuenta/contrato/${itemfind}`
  startLoadingEstadoCuenta(param)  
  
}, [dataEstadoCuenta])

console.log(estadoCuenta);

const estadocuentaIngresos = [estadoCuenta].concat(ingresos).concat(egresos)

console.log(estadocuentaIngresos);


type EstadoCuenta = typeof estadocuentaIngresos[0];
const columns = [
  {name: "Concepto", uid: "concepto"},
  {name: "Monto Egreso", uid: "monto"},
  {name: "Monto Ingreso", uid: "monto"},
  {name: "Cuenta Saldo", uid: "cuentasaldo"},
  {name: "Total de lotes", uid: "totaldelotes"},
  {name: "Total de Manzanas", uid: "totaldemanzanas"},
  {name: "Costo", uid: "costototal"},
  {name: "Acciones", uid: "actions"},
];


/* 
const openModalFracc = (e:number) => {  
      setFracc(e)    
  } */

 const renderCell = React.useCallback((estadocuentaIngresos: EstadoCuenta, columnKey: React.Key) => {
    const cellValue = estadocuentaIngresos[columnKey as keyof EstadoCuenta];
	

 switch (columnKey) {
      case "name":
        return (
          <EstadoCuenta
            description={fraccs.nombre}
            name={cellValue}
          >
            {/* {fraccs.propietario} */}
          </EstadoCuenta>
        );
      case "egresos":
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
              <span className="text-lg  cursor-pointer text-success active:opacity-50" onClick={onOpen}>
                {/* <EyeFilledIcon onClick={() => openModalFracc(fraccs)}   /> */}
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Edit user" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                {/* <Link href={`/cliente/${fraccs.id}`}> */}
                  {/* <TbEditCircle onClick={() => showClient(fraccs) } /> */}
               {/*  </Link> */}
                
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
          <div className="flex justify-end">
             <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onOpen}>
                  Agregar Fraccionamiento
                </Button>
          </div>

               

      <Table 
      className="h-[90vh] w-[auto] p-5"
      >   
        <TableHeader className=" " columns={columns}>
          {(columns) => (
            <TableColumn
              className=" min-w-30 text-red-800 font-bold text-base"
              key={columns.uid}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className="text-black  font-semibold" items={estadocuentaIngresos}>
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
              value={data.nombre}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escribe el nombre del Fraccionamiento o Parcela"
			  description = "Escriba el nombre"
             variant='bordered'
              name="nombre"
              id="nombre"
            />
				
				<Input
              value={data.clave}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escrba la Clave del Fraccionamiento"
			  description = "Escriba la clave"
             variant='bordered'
              name="clave"
              id="clave"
            />
			
			<Input
              value={data.propietario}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escriba el Propietario"
			  description = "Escriba el propietario"
             variant='flat'
              name="propietario"
              id="propietario"
            />
			<Input
              value={data.telefono}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escriba el Telefono para contacto"
			  description = "Escriba el telefono"
             variant='flat'
              name="telefono"
              id="telefono"
            />
			<Input
              value={data.direccion}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Escriba la Direccion del Fraccionamiento"
			  description = "Escriba la direccion"
             variant='flat'
              name="direccion"
              id="direccion"
            />
			


              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleAddFracc}>
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