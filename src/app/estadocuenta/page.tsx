"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import useFraccs from '@/app/fraccionamientos/hooks/useGetFracc'
import useGetFraccbyId from '@/app/fraccionamientos/hooks/useGetFraccbyId'
import { Button, Card, CardBody, CardFooter, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import useLotes from '@/app/lotes/hooks/useGetLotes'
import useGetClientebyId from '../cliente/hooks/useGetClientebyId'
import useRegisterContrato from '../cliente/[id]/contratos/hooks/useRegisterContrato'
import NavbarInicio from '@/components/navbar'
import axios from 'axios'
import useGetImages from '../hooks/useGetImages'


const Contrato = () => {
const params = useParams()
const itemfind = (parseInt(params.id))

const {startLoadingClientes,dataCliente,cliente} = useGetClientebyId()
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users)
const {lotesVendidos,startLoadingLotes,dataLotes} = useLotes()

const lotes = lotesVendidos

const {data, handleSetData,registerContratoApi} = useRegisterContrato()

const {isOpen, onOpen, onOpenChange} = useDisclosure();
const param = `clientes/${itemfind}`

useEffect(() => {
  startLoadingClientes(param)
	
}, [dataCliente])
/* 
if (cliente.usuarioId!==id) {
	console.log("no tienes permiso");
	
}
console.log(cliente); */
useEffect(() => {
  const param = `lotes/vendidos`
  startLoadingLotes(param)
	
}, [dataLotes])

console.log(lotes);

const img = "/S_002.jpg"

const [lote , setLote] = useState({})
const { dataImages,startLoadingImages} = useGetImages()
useEffect(() => {
 
	  startLoadingImages()
	
	}, [dataImages]);
console.log(data);


const axios = require('axios');
const AWS = require('aws-sdk');

// Configura las credenciales de AWS
/* AWS.config.update({
  accessKeyId: 'AKIAVRUVQYJLX45NKPWI',
  secretAccessKey: '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',
  region: 'us-east-2', // Reemplaza con la región de tu bucket, por ejemplo, 'us-east-1'
});

// Crea una instancia del servicio S3 de AWS
const s3 = new AWS.S3();

// Define la URL del objeto en tu bucket
const bucketName = 'inmobiliariathi';
const objectKey = 'https://inmobiliariathi.s3.us-east-2.amazonaws.com/Alcaldes.jpeg'; // Reemplaza con la ruta de tu imagen

// Función asincrónica para realizar la solicitud GET
async function getImageFromS3() {
  try {
    // Utiliza el método getObject de S3 para obtener la imagen
    const response = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();

    // Accede a los datos de la respuesta (los datos de la imagen)
    const imageData = response.Body;

    // Haz algo con los datos, como mostrar la imagen
    console.log('Datos de la imagen:', imageData);
  } catch (error) {
    // Maneja los errores, si los hay
    console.error('Error al obtener la imagen de S3:', error.message);
  }
}

// Llama a la función para iniciar la solicitud GET
getImageFromS3(); */

const handleRegisterContrato = async () => {
 
  const path = `contratos/lote/${lote.id}`
await  registerContratoApi({...data, 
    inicio: (new Date()), 
    fecha: (new Date()),
    pagado:0, 
    estatus: 0, 
    usuarioId: id, 
    clientesId: itemfind ,
    contratoId: lote.id ,
    loteId: lote.id}
    ,path)
}
const handleOpenLote = (loteid:number) => {
  onOpen()
  setLote(loteid)
 
}


  return (
	<main className=''>
		<NavbarInicio />

	<div className="bg-white gap-3 grid grid-cols-1 sm:grid-cols-4 p-5 absolute  justify-center align-middle">
		
      {lotes.map((item, index) => (
        <Card shadow="sm" className="bg-slate-100 shadow-primary shadow-md" key={index} isPressable onPress={()=>handleOpenLote(item)}>
          <CardBody className="overflow-visible p-0 ">
            
           <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.clave}
              className="w-full object-cover h-[140px]"
              src={img}
            />
          </CardBody>
          <CardFooter className="flex gap-3 text-small justify-between">
            <b > {item.clave} </b>
            <p className="text-default-500"> costo : $ {item.costo} mxn </p>
            <p className="text-default-500"> m²: {item.m2} </p>
          </CardFooter>
        </Card>
        
      ))}
        </div>

	   
	</main>
 


    
  );
      }
export default Contrato