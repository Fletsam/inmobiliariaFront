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

import { IoAdd, IoImageOutline, IoImagesOutline, IoSearchOutline, IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";
import { EyeFilledIcon } from "@/helpers";
import moment from "moment";
import { formatPrecio } from "@/helpers/formatearprecios";
import { formatters } from "date-fns";
import { TbEditCircle } from "react-icons/tb";
import useGetFraccbyId from "../../hooks/useGetFraccbyId";
import { useParams } from "next/navigation";
import useRegisterManzana from "@/app/manzanas/hooks/useRegisterManzana";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useFraccs from "../../hooks/useGetFracc";
import { FiDelete } from "react-icons/fi";
import useDeleteManzana from "@/app/manzanas/hooks/useDeleteManzana";
import { useRouter } from "next/router";


const ClienteId = () => {

/*   const router = useRouter()
 */const params = useParams();
const itemfind  = (parseInt(params.id));
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)	
const {startLoadingFracc,dataFracc,fracc,manzanas } = useGetFraccbyId()	
/* const {isOpen, onOpen, onOpenChange} = useDisclosure();
 */
const {handleSetData ,data ,registerManzanaApi} = useRegisterManzana()
const {DeleteManzanaApi, startDeleteManzana} = useDeleteManzana()

console.log(id);

const param = `fraccionamientos/${itemfind}/usuario/${id}`

useEffect(() => {
  
  startLoadingFracc(param)  

}, [dataFracc])

console.log(fracc);
console.log(manzanas);



const Swal = require('sweetalert2')

const deleteManzana = async (id:number) => {

 const pathPag = `manzanas/${id}`
 
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
    Swal.fire({
      title: "Eliminado!",
      text: "El cliente ha sido eliminado!.",
      icon: "success"
    });
   startDeleteManzana(pathPag)
   startLoadingFracc(param)
  }
  /* router.push("/usuario") */
});
}


type Manzanas = typeof manzanas[0];
const columns = [
	{name: "Numero de Manzana", uid: "numero"},
  {name: "Clave de Manzana", uid: "clave"},
  {name: "Acciones", uid: "actions"},
];
  let numeral = require('numeral');

const [manzana, setManzana] = useState({})

/* const openModalFracc = (e:number) => {  
      setFracc(e)    
  } */

 const renderCell = React.useCallback((manzanas: Manzanas, columnKey: React.Key) => {
    const cellValue = manzanas[columnKey as keyof Manzanas];


 switch (columnKey) {
      case "name":
        return (
          <Manzanas
            description={manzanas.nombre}
            name={cellValue}
          >
            {/* {fraccs.propietario} */}
          </Manzanas>
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
                {/* <EyeFilledIcon onClick={() => openModalFracc(fraccs)}   /> */}
          
              </span>
            </Tooltip>
            <Tooltip color="warning" content="Lotes" className="text-white">
              <span className="text-lg text-warning cursor-pointer active:opacity-50">
                <Link href={`/manzanas/${manzanas.id}`}>
                  <IoImageOutline />
                </Link>
                
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <IoTrashOutline onClick={() => deleteManzana(manzanas.id) } />
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
    
		  <div className="flex flex-1 justify-between px-5">
		  <h1 className="text-primary font-semibold text-2xl pt-2"> {fracc.nombre} </h1>
		  

  
		  </div>
			
	
      <Table 
      className="h-[90vh] w-[auto] p-5"
      >   
	  
        <TableHeader className=" " columns={columns}>
          {(columns) => (
            <TableColumn
              className=" min-w-40 text-red-800 font-bold text-base"
              key={columns.uid}
            >
              {columns.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody className="text-black  font-semibold" items={manzanas}>
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

	   
     {/*  <>
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
    </> */}


    </main>
  );
}

export default ClienteId