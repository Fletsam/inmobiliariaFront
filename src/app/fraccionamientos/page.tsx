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
import useFraccs from "./hooks/useGetFracc";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { EyeFilledIcon } from "@/helpers";
import moment from "moment";
import { formatPrecio } from "@/helpers/formatearprecios";
import { formatters } from "date-fns";
import { TbEditCircle } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useRegisterFracc from "./hooks/useRegisterFracc";


export default function Fraccionamientos() {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingFraccs,dataFracc, fraccs } = useFraccs()
const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 

const { handleSetData, data,registerFraccApi} = useRegisterFracc()


useEffect(() => {
  const param = `fraccionamientos/usuario/${id}`
  startLoadingFraccs(param)  
  
}, [dataFracc])

console.log(fraccs);

const handleAddFracc = () => {
  console.log(data);
  
  registerFraccApi({...data,totaldelotes:0,totaldemanzanas:0,costototal:0, usuarioId:id})

} 


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
  let numeral = require('numeral');

const [fracc, setFracc] = useState({})

const openModalFracc = (e:number) => {  
      setFracc(e)    
  }

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
              <span className="text-lg  cursor-pointer text-success active:opacity-50" onClick={onOpen}>
                <EyeFilledIcon onClick={() => openModalFracc(fraccs)}   />
          
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
