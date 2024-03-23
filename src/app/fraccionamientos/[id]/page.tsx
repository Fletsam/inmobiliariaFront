







"use client"
import { RootState } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Card, CardBody, CardFooter, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverTrigger, Select, SelectItem, Tab, Tabs, Tooltip, useDisclosure } from "@nextui-org/react";

import useGetFraccbyId from "../hooks/useGetFraccbyId";
import NavbarInicio from "@/components/navbar";
import { CldImage } from "next-cloudinary";

import useRegisterContratoFracc from "../hooks/useRegisterContratoFracc";

const options = [
  {
    label: "Lotes" , 
    value:  "Lotes"
  },
  {
    label: "Manzanas" , 
    value:  "Manzanas"
  },
  {
    label: "Clientes" , 
    value:  "Clientes"
  }

]


const Fraccionamiento = () => {
	const params = useParams();
	const itemfind  = (parseInt(params.id));
  const router = useRouter()
  const { isLogged, nombre , id } = useSelector((state: RootState) => state.users); 
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const {startLoadingFracc,dataFracc,fracc,lotes,manzanas} = useGetFraccbyId()
  const {data,handleSetData,setData,registerContratoFraccApi} = useRegisterContratoFracc()
  const [selectedOption , setSelectedOption]  = useState<string>("Lotes") 

const param = `fraccionamientos/${itemfind}/usuario/${id}`

	useEffect(() => {
  
  	startLoadingFracc(param)  
		
		}, [dataFracc])

console.log(fracc);

const handleContrato = () => {
  const param = `contratos/fraccionamiento/${itemfind}`
  registerContratoFraccApi({...data, contratoFraccId:itemfind , usuarioId: id,},param)
  onClose()
}


console.log(lotes);


const Cards = useCallback(() =>{  
switch (selectedOption) {
  case "Lotes":
   
    
   return ( 
	<div >

		<div className='md:grid md:gap-5 md:grid-cols-2 justify-items-center grid gap-2 '>
       {lotes.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md p-0 md:w-52 h-20 text-center w-full " key={index} isPressable /* onPress={()=>handleOpenLote(item)} */>
          <CardBody className=" flex h-auto">
            {/* <CldImage
            className='w-auto h-auto p-1 bg-gray-950/5'
            alt=''
            width="300"
            height="300"
            src={`Logos/${item.clave.slice(0,-4)}`}/> */}
            <div className=" flex justify-between">
             <h1 className='text-black drop-shadow-md shadow-red-900' > {item.clave} </h1>
             {item.contratoId !== 0 ?
              <Chip className="capitalize text-white cursor-pointer" color="success"  size="sm" variant="shadow" onClick={()=> router.push(`/estadocuenta/cliente/${item.contratoId}`)} >
              Vendido
              </Chip>
            : 
              <Chip className="capitalize text-white cursor-pointer" color="secondary"  size="sm" variant="shadow" onClick={()=> router.push(`/cliente`)} >
              Disponible
              </Chip>
            }
            </div>
          <CardFooter className=" bg-slate-200/25 flex gap-3 text-small justify-between h-auto p-2">
            m² : {item.m2}
          </CardFooter>
          </CardBody>
        
        </Card>
        
      ))}
		</div>
	</div>
   ) 
    
case "Manzanas":
     return ( 
	
				<div className='grid gap-2 md:gap-5 md:grid-cols-2 justify-items-center'>
       {manzanas.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md p-0 md:w-52 w-full h-20 text-center" key={index} isPressable onClick={() => router.push(`/manzanas/${item.id}`)}>
          <CardBody className=" flex h-auto">
            <div className="justify-between">
              <h1 className="text-primary text-large font-semibold">
                Manzana : <span className="text-black font-normal text-base"> {item.numero}</span>
              </h1>
             <h1 className='text-primary text-large font-semibold'> 
              Clave :
              <span className="text-black font-normal text-base"> {item.clave} </span>
             </h1>
            </div>
          </CardBody>
          
        
        </Card>
        
      ))}
		</div>
	
   ) 
  
case "fraccs":
    
    break;
}
},[selectedOption, lotes])




return (
    <main className='text-black bg-slate-200'>
		<div className=' w-screen  md:block  '>
	<NavbarInicio>
 	<Tabs
      className="max-w-xs text-white pt-5"
      disableSelectorIconRotation
      onSelectionChange={setSelectedOption}
      selectedKey={selectedOption}
      color='primary'
    >
      {options?.map((option) => (
        <Tab className='text-white'  key={option.value} value={option.value} title={option.value}>
        </Tab>
      ))}
     </Tabs>
		</NavbarInicio>
	
			</div>
			
		<section className=' w-full md:flex'>
			<div className=' bg-slate-200 md:w-1/2 bg-slate-white md:grid  flex-col justify-center'>
			<div className='bg-white/5 h-auto md:grid grid justify-items-center pt-4'>
        <div className=' h-auto'>
          <CldImage
              alt={`${fracc.id}`}
              className='w-60 h-60 rounded-md mx-auto shadow-black drop-shadow-md'
              width={400}
              height={400}
              src={`Logos/${fracc.clave}`}/>
				<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black '>
          <div className="flex gap-5">
          <h1 className="text-primary text-2xl font-semibold ">
            {fracc.nombre}
          </h1>
         
          {fracc.contratoFraccId !== 0 ?
              <Tooltip color="success" className="text-white" content="Ver el estado de cuenta">
                <Chip className="capitalize text-white cursor-pointer" color="success"  size="sm" variant="shadow" onClick={() => router.push(`/estadocuenta/fraccionamiento/${fracc.id}`)} >
                Activo
                </Chip>
              </Tooltip>
            : 
            <Tooltip color="danger" className="text-white" content="Haga click para activarlo">
              <Chip className="capitalize text-white cursor-pointer" color="danger"  size="sm" variant="shadow" onClick={onOpen}>
              Inactivo
              </Chip>
            </Tooltip>
              
          }
          </div>
          <h2 className=" text-primary text-lg">
            Propietario : <span className="text-black font-normal text-base"> {fracc.propietario} </span>
          </h2>
          <h2 className=" text-primary text-lg">
            Teléfono : <span className="text-black font-normal text-base"> {fracc.telefono} </span>
          </h2>
          <h2 className=" text-primary text-lg">
            Dirección : <span className="text-black font-normal text-base"> {fracc.direccion} </span>
          </h2>
          <h2 className=" text-primary text-lg">
            Metros Cuadrados : <span className="text-black font-normal text-base"> {fracc.m2} m² </span>
          </h2>
				</div>
			</div>
			</div>
			
      
			</div>
					<div className='bg-slate-200 md:w-1/2 '>
					<div className='bg-white m-2 p-2 rounded-lg drop-shadow-md shadow-black gap-3 '>
						{Cards()}
					</div>
				</div>
		</section>

<>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="text-primary">{fracc.nombre}</p></ModalHeader>
              <ModalBody className="text-black " >
				<Input
						value={(data.preciom2).toString()}
						type="text"
						onChange={handleSetData}
						className='text-black'
						label="Precio por metro cuadrado"
						variant='bordered'
						description = "Escriba el precio por m²"
						name="preciom2"
						id="preciom2"
						/>
				<Input
						value={(data.enganche).toString()}
						type="text"
						onChange={handleSetData}
						className='text-black'
						label="Añada el enganche"
						description = "Escriba el enganche"
						variant='bordered'
						name="enganche"
						id="enganche"
						/>
				<Input
						value={(data.pagosafinanciar).toString()}
						type="text"
						onChange={handleSetData}
						className='text-black'
						label="Pagos a financiar"
						description = "Escriba los pagos a financiar"
						variant='bordered'
						name="pagosafinanciar"
						id="pagosafinanciar"
						/>
				<Input
						value={(data.interesanual).toString()}
						type="text"
						onChange={handleSetData}
						className='text-black'
						label="Interes Anual"
						description = "Escriba interes anual en decimales"
						variant='bordered'
						name="interesanual"
						id="interesanual"
						/>
			
				
              </ModalBody>
                <ModalFooter>
                <Button className='text-white bg-primary shadow-md shadow-primary ' onClick={handleContrato}>
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>


	</main>
  );
};

export default Fraccionamiento