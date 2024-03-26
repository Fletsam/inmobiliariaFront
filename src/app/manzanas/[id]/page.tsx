"use client"


import { RootState } from "@/store"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useGetManzanabyId from "../hooks/useGetManzanabyId"
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react"
import { IoBusiness, IoSearchOutline, IoTrashOutline } from "react-icons/io5"
import useDeleteLote from "@/app/lotes/hooks/useDeleteLote"
import Link from "next/link"
import useRegisterLote from "@/app/lotes/hooks/useRegisterLote"





const ManzanaId = () =>  {
  const router = useRouter()
  const params = useParams();
	const itemfind  = (parseInt(params.id));
  const {isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();
  const {startLoadingManzana ,lotes ,manzana, dataManzana, fracc} = useGetManzanabyId() 
  const { isLogged, nombre , id } = useSelector((state: RootState) => state.users);
  const {DeleteLoteApi,startDeleteLote,statusDeleteLote} = useDeleteLote()
  const {handleSetData ,data ,registerLoteApi} = useRegisterLote()

 const pathpag = `manzanas/${itemfind}`
  useEffect(() => {
   
    startLoadingManzana(pathpag)
  }, [dataManzana])
  

 const totalm2 =  lotes.reduce((total,monto) => monto.m2 + total , 0 )


const Swal = require('sweetalert2')
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
        startLoadingManzana(pathpag)
        } 
        
})}

const handleAddLote = async () => {
	await registerLoteApi({...data , usuarioId: id, fraccionamientoId: manzana.fraccionamientoId, costototal: 0, contratoId:0 , manzanaId:itemfind })
	onClose()

}
  
type Lotes = typeof lotes[0];
const columns = [
	{name: "Numero de Lote", uid: "numero"},
  {name: "Clave de Lote", uid: "clave"},
  {name: "Metros cuadrados", uid: "m2"},
  {name: "Estatus", uid: "status"},
  {name: "Acciones", uid: "actions"},
];
let numeral = require('numeral');
const renderCell = React.useCallback((lotes: Lotes, columnKey: React.Key) => {
    const cellValue = lotes[columnKey as keyof Lotes];

 switch (columnKey) {

      case "costo":
          const costo = numeral(cellValue).format('$0,0')
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{costo}mxn</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "m2":
          
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm "> {cellValue} m²</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{ fraccs.propietario}</p> */}
          </div>
        );
      case "status":
        return (
          <>
            {lotes.contratoId === 0 ?

               <Chip className="capitalize text-white cursor-pointer" color="secondary"  size="sm" variant="shadow" onClick={()=> router.push(`/cliente`)}>
              Disponible
              </Chip>
  
            : 
            <Tooltip content= "Ver cliente" color="success" className="text-white " placement="left">
              <Link href={`/cliente/${lotes.Contrato.clientesId}`}>
                <Chip className="capitalize text-white cursor-pointer" color="success"  size="sm" variant="shadow">
                Vendido
                </Chip>
              </Link>
             </Tooltip>
          }
          </>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
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
  
 const [filter, setFilter] = useState('');

  const filteredData = lotes.filter(item => item.clave.toLowerCase().includes(filter.toString().toLocaleLowerCase()));



return(
  <main className="bg-slate-200 p-5 text-black ">
  <div className=" flex justify-between px-5">
    <div>
    <h1 className="text-primary text-2xl font-semibold  justify-between">
      {fracc.nombre} 
      
       
    </h1>
   
    <h2 className="text-primary">
      Clave de la Manzana:
    </h2>
    <h3>
        {manzana.clave}
    </h3>
    <h2 className="text-primary">
      Metro Cuadrados Totales:
    </h2>
    <h3>
        {totalm2} m²
    </h3>
    <span className="w-5 h-auto flex relative">
             <Tooltip color="default" className="text-blue-600 w-auto" content="Ficha de Fraccionamiento" placement="right">
              <span className="text-lg w-auto  cursor-pointer active:opacity-50 text-blue-600">
                <IoBusiness onClick={() => router.push(`/fraccionamientos/${fracc.id}`) } />
              </span>
            </Tooltip>
            </span>
    </div>
  
    <div className="grid justify-items-end">
      <Input
            isClearable
            type="text"
            className="w-full sm:max-w-[44%] text-black"
            placeholder="Clave"
            startContent={<IoSearchOutline className=" text-primary text-xl font-bold"/>}
            value={filter}
            onChange={e => setFilter(e.target.value)}
            id="search"
            name="search"
          />
    <Button className='text-white bg-primary shadow-md shadow-primary bottom-0 max-w-[44%] ' onClick={onOpen}>
      Agregar Lote
    </Button>
    </div>
     
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

        <TableBody className="text-black font-semibold " items={filteredData}>
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
              value={data.numero}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Numero de Lote"
			  description = "Escriba el numero de Lote"
             variant='bordered'
              name="numero"
              id="numero"
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
  
)

}
export default ManzanaId