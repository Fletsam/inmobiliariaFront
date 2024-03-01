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


export default function Fraccionamiento() {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingFraccs,dataFracc, fraccs } = useFraccs()
const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 
console.log(id);

useEffect(() => {
  const param = `fraccionamientos/usuario/${id}`
  startLoadingFraccs(param)  
  
}, [dataFracc])
console.log(fraccs);



type Fraccs = typeof fraccs[0];
const columns = [
  {name: "Nombre", uid: "nombre",sortable:true},
  {name: "Propietario", uid: "propietario"},
/*   {name: "Telefono", uid: "telefono"},
  {name: "Direccion", uid: "direccion"},
  {name: "Total de lotes", uid: "totaldelotes"},
  {name: "Total de Manzanas", uid: "totaldemanzanas"},
  {name: "Costo", uid: "costototal"}, */
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
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">{(fracc.propietario)}</p></ModalHeader>
              <ModalBody className="text-black " >
					     <section className="grid grid-rows">
                <div className=" border-b-2 pt-2">
                  <h1 className="text-primary font-bold  ">Propietario</h1>
                  <h2 className=" pt-1">{fracc.propietario}</h2>
                </div>
                <div className="border-b-2">
                  <h1 className="text-primary font-semibold ">Telefono</h1>
                  <h2>{fracc.telefono}</h2>
                </div>
                <div className="border-b-2">
                  <h1 className="text-primary font-semibold ">Direccion</h1>
                  <h2>{fracc.direccion}</h2>
                </div>
                <div className="items-center border-b-2 py-2" >
                <h1 className="text-primary font-semibold"> Costo : <span className="text-black font-normal"> ${ numeral(fracc.costototal).format("0,0") } Mxn</span></h1> 
                </div>
                  <div className="flex flex-1 justify-between pt-2">
                    <div>
                      <h2 className="text-primary">
                        Total de Manzanas :
                        <span className="text-black font-semibold">  {fracc.totaldemanzanas} </span>
                      </h2>
                    </div>
                    <div>
                      <h2 className="text-primary ">
                        Total de Lotes :
                        <span className="text-black font-semibold">  {fracc.totaldelotes}   </span> 
                      </h2>
                        
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
