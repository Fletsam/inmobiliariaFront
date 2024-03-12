"use client"
import { PDFViewer } from '@react-pdf/renderer'
import React, { useEffect } from 'react'
import { ContratoPDF } from './contrato'
import { useParams } from 'next/navigation'
import useGetClientebyId from '@/app/cliente/hooks/useGetClientebyId'
import useGetContratobyId from '@/app/estadocuenta/hooks/useGetContrato'

const page = () => {
const params = useParams()
const itemfind = (parseInt(params.id))



	const {dataContrato,cliente,lote,contrato,startLoadingContrato} = useGetContratobyId()


useEffect(() => {
  const param = `contratos/${itemfind}`
  startLoadingContrato(param)


}, [dataContrato])
console.log(cliente);
console.log(contrato);
console.log(lote);


  return (
	<PDFViewer>
    <ContratoPDF cliente={cliente} contrato={contrato} lote={lote} />
  </PDFViewer>

  )
}

export default page