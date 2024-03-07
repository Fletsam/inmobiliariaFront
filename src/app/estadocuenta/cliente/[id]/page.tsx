"use client";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useGetEstadoCuenta from "../../hooks/useGetEstadoCuenta";
import { useParams } from "next/navigation";
import useGetContratobyId from "../../hooks/useGetContrato";
import useGetClientebyId from "@/app/cliente/hooks/useGetClientebyId";
import useRegisterAbono from "../../hooks/useRegisterAbono";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import moment from "moment";
import 'moment/locale/es';

import XLSX from "xlsx"
export default function Fraccionamientos ()  {
	const params = useParams();
const itemfind  = (parseInt(params.id));
const {isOpen, onOpen, onOpenChange} = useDisclosure();
const {startLoadingEstadoCuenta,estadoCuenta,dataEstadoCuenta,ingresos,egresos } = useGetEstadoCuenta()

const {contrato,dataContrato,startLoadingContrato,cliente,lote} = useGetContratobyId()
const {data,handleSetData,registerAbonoApi} = useRegisterAbono()
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)

useEffect(() => {
  const param = `estadocuenta/contrato/${itemfind}`
  startLoadingEstadoCuenta(param)  
  
}, [dataEstadoCuenta])

useEffect(() => {
  const param = `contratos/${itemfind}`
  startLoadingContrato(param)


}, [dataContrato])

  const paramAbono = `abonos/contrato/${itemfind}`
const handleAddAbono = (e) => {
	e.preventDefault()
	registerAbonoApi({...data , usuarioId: id, contratoId: itemfind}, paramAbono)
	

}

moment.locale("es")


const estadocuentaIngresos = [estadoCuenta].concat(ingresos).concat(egresos)

type EstadoCuenta = typeof estadocuentaIngresos[0];
const columns = [
  {name: "Concepto", uid: "concepto"},
  {name: "Monto Egreso", uid: "montoegreso"},
  {name: "Monto Ingreso", uid: "montoingreso"},
  {name: "Cuenta Saldo", uid: "cuentasaldo"},
  {name: "Fecha de Creacion", uid: "fhcreacion"},
];

var numeral = require('numeral');
/* 
const openModalFracc = (e:number) => {  
      setFracc(e)    
  } */

const handleExport = () => {

  var wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(estadocuentaIngresos)

  XLSX.utils.book_append_sheet(wb ,ws ,"estadocuentaingresos")

  XLSX.writeFile(wb, `EstadoCuenta ${cliente.nombre}.xlsx`)
}



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
      case "montoegreso":
            const montoegreso = numeral(cellValue).format('0,0')

        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{montoegreso !== "0" ? `$ ${montoegreso} mxn` : ""}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "montoingreso":
            const montoingreso = numeral(cellValue).format('0,0')

        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{montoingreso !== "0" ? `$ ${montoingreso} mxn` : ""}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "cuentasaldo":
            const cuentasaldo = numeral(cellValue).format('0,0')

        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cuentasaldo !== "0" ? `$ ${cuentasaldo} mxn` : ""}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "fhcreacion":
        const fecha = moment(cellValue).format('LLLL')
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{fecha}</p>
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
      
       <section className=" text-black flex justify-between p-3">
      <div className="">
        <h1 className="text-primary font-bold text-xl border-white border-b-3">
          Cliente
        </h1>
        <div>
          <h1 className="text-primary font-semibold pt-2 ">
            Nombre: <span className="text-black font-normal">{cliente.nombre} </span> 
          </h1>
          <h1 className="text-primary font-semibold pt-2 ">
            Telefono : <span className="text-black font-normal"> {cliente.telefono}</span>
          </h1>
        </div>
        <div className="p-3">
                <Button className='text-white bg-primary shadow-md shadow-primary w-auto h-5 ' onClick={onOpen}>
                  Ficha del cliente
                </Button>
        </div>    
       </div>
        <div>
          <h1 className="text-primary font-bold text-xl border-white border-b-3">
          Lote
        </h1>
        <div className="">
           <h1 className="text-primary font-semibold pt-2 ">
            Clave: <span className="text-black font-normal">{lote.clave} </span> 
          </h1>
          <h1 className="text-primary font-semibold pt-2 ">
            Metros Cuadrados : <span className="text-black font-normal"> {lote.m2}m²</span>
          </h1>
        </div>
       </div>
      <div >
        <h1 className="text-primary font-bold text-xl border-white border-b-3">
          Contrato
        </h1>
        <div className="">
           <h1 className="text-primary font-semibold pt-2 ">
            Pagos a Financiar: <span className="text-black font-normal">{contrato.pagosafinanciar} </span> 
          </h1>
          <h1 className="text-primary font-semibold pt-2 ">
            Interesanual : <span className="text-black font-normal"> {numeral(contrato.interesanual).format('0%')} </span>
          </h1>
          <h1 className="text-primary font-semibold pt-2 ">
            Pago Mensual : <span className="text-black font-normal"> $ {numeral(contrato.pagomensual).format('0,0')} Mxn</span>
          </h1>
         
          <h3 className="text-primary font-semibold pt-2 ">
            1°Testigo : <span className="text-black font-normal"> Luis Eduardo Amador Cervantes</span>
          </h3> 
          <h3 className="text-primary font-semibold pt-2 ">
            2°Testigo : <span className="text-black font-normal"> {contrato.testigo2}</span>
          </h3> 


         
        </div>
       </div>
       <form action="submit" onSubmit={(e)=> handleAddAbono(e)}>
				<Input
              value={(data.montoingreso).toString()}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Añadir un Abono"
			  description = "Escriba el monto del Abono"
             variant='flat'
              name="montoingreso"
              id="montoingreso"
            /></form>	
       </section>
      
      

  <div className="flex justify-between text-black">
      <h1 className="text-primary font-bold text-xl">
        Fecha de inicio:  <span className=" text-black font-semibold capitalize">{moment(contrato.inicio).format('dddd, Do [de] MMMM [de] YYYY')} </span>
      </h1>
                <Button className='text-white bg-primary shadow-md shadow-primary w-auto h-5 ' onClick={handleExport}>
                  Exportar Excel
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
                        Fecha de Creacion :  <span className="text-black font-semibold capitalize"> {moment(cliente.fhcreacion).format('dddd, Do [de] MMMM [de] YYYY')} </span> 
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