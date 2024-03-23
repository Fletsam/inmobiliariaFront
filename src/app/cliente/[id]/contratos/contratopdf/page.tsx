"use client"
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React, { useEffect } from 'react'
import { ContratoPDF } from './contrato'
import { useParams } from 'next/navigation'
import useGetClientebyId from '@/app/cliente/hooks/useGetClientebyId'
import useGetContratobyId from '@/app/estadocuenta/hooks/useGetContrato'
import { Button } from '@nextui-org/react'

const page = () => {
const params = useParams()
const itemfind = (parseInt(params.id))



	const {dataContrato,cliente,lote,contrato,startLoadingContrato} = useGetContratobyId()


useEffect(() => {
  const param = `contratos/${itemfind}`
  startLoadingContrato(param)


}, [dataContrato])

const handleSaveContrato = () =>{
  ReactPDF.render(<PDFViewer />, `${__dirname}/example.pdf`);
}

const filename = `${cliente.nombre}_Contrato.pdf`

  return (
    <>
      <Button onClick={handleSaveContrato}>
      save
    </Button>
	<PDFViewer>
    <ContratoPDF cliente={cliente} contrato={contrato} lote={lote} />
  </PDFViewer>
<PDFDownloadLink document={<ContratoPDF cliente={cliente} contrato={contrato} lote={lote} />} fileName={filename}>
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>
    </>
    
  )
}

export default page