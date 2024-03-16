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
import { IoDocumentTextOutline, IoImageOutline, IoImagesOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { EyeFilledIcon } from "@/helpers";
import moment from "moment";
import { formatPrecio } from "@/helpers/formatearprecios";
import { formatters } from "date-fns";
import { TbEditCircle } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useRegisterFracc from "./hooks/useRegisterFracc";
import { useRouter } from "next/navigation";


export default function Fraccionamientos() {
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingFraccs,dataFracc, fraccs } = useFraccs()
const { isLogged, nombre, id } = useSelector((state: RootState) => state.users); 

const { handleSetData, data,registerFraccApi} = useRegisterFracc()

const router = useRouter()

useEffect(() => {
  const param = `fraccionamientos/usuario/${id}`
  startLoadingFraccs(param)  
  
}, [dataFracc])

console.log(fraccs);

const handleAddFracc = () => {
  console.log(data);
  
  registerFraccApi({...data,totaldelotes:0,costototal:0, usuarioId:id, contratoFraccId:0})

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

const toManzana = (e:number) => {  
  console.log(e);
    router.push(`/fraccionamientos/${e}/manzanas`)
  }
const toLotes = (e:number) => {  
  console.log(e);
    router.push(`/fraccionamientos/${e}/lotes`)
  }
const toEstadoCuenta = (e:number) => {  
  console.log(e);
    router.push(`estadocuenta/fraccionamiento/${e}`)
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
      case "costototal":
        const costo = numeral(cellValue).format('$0,0')
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{costo}Mxn</p>
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
            <Tooltip content="Manzanas" color="danger" className="text-white">
              <span className="text-lg  cursor-pointer text-danger active:opacity-50">
                <IoImagesOutline onClick={ ()=> toManzana(fraccs.id) }   />
                
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Lotes" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                  <IoImageOutline onClick={ ()=> toLotes(fraccs.id) }   />
              
                
              </span>
            </Tooltip>
            <Tooltip color="default" className="text-blue-600" content="Estado de Cuenta">
              <span className="text-lg  cursor-pointer active:opacity-50 text-blue-600">
                <IoDocumentTextOutline onClick={() => toEstadoCuenta(fraccs.id) } />
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
			<Input
              value={(data.m2).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Cuantos Metros Cuadrados Tiene"
			  description = "Escriba los metros cuadrados"
             variant='flat'
              name="m2"
              id="m2"
            />
			
			<Input
              value={(data.totaldemanzanas).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Cuantas Manzanas tienes"
			  description = "Escriba las manzanas que tiene"
             variant='flat'
              name="totaldemanzanas"
              id="totaldemanzanas"
            />
			


              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onPress={handleAddFracc}>
                  Agregar Fraccionamiento
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
