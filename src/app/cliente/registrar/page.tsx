"use client"
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react'
import DatePicker from "react-datepicker";
import useRegisterCliente from '../hooks/useRegisterCliente';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const genero = [
  {label: "Masculino", value: "masculino"},
  {label: "Femenino", value: "femenino"}
]
export const estadocivil = [
  {label: "Casado/a", value: "casado"},
  {label: "Soltero/a", value: "soltero"},
  {label: "Divorciado/a", value: "divorciado"},
  {label: "Separado/a", value: "separado"},
  {label: "Viudo/a", value: "viudo"},
  {label: "Concubinato/a", value: "concubinato"},
]

const RegisterCliente = () => {
	const { data, handleSetData, handleSetDate, registerClienteApi } =
    useRegisterCliente();
const { isLogged, nombre , id } = useSelector((state: RootState) => state.users); 

	const handleRegisterCliente  = (e:any) => {
			e.preventDefault();
			registerClienteApi({...data , usuarioId: id})
			console.log(data);	
	}


  return (
    <main className=" bg-slate-100  p-3 ">
      
      <form action="submit" className=" p-2 bg-slate-200/90 w-full  lg:h-[100vh] rounded-xl shadow-2xl ">
			<h2 className="p-3 font-bold text-2xl  text-primary/100">
			Registra a un Cliente
			</h2>
        <div className=" md:grid md:grid-cols-3 md:gap-10 lg:py-0  ">
          <div className=" py-1 md:py-0 order-first">
            <Input
              value={data.nombre}
              type="text"
              onChange={handleSetData}
			  className='text-black'
              label="Nombre"
             variant='flat'
              name="nombre"
              id="nombre"
            />
          </div>
          <div className=" py-1 md:py-0  order-2 ">
            <Input
              value={data.telefono}
              type="text"
              onChange={handleSetData}
              label="Numero Telefonico"
			  className='text-black'
              variant='flat'
              name="telefono"
              id="telefono"
            />
          </div>
   		<div className=" py-1 md:py-0 order-2">
            <Input
              value={data.correo}
              type="text"
              onChange={handleSetData}
              label="Correo Electronico"
			  className='text-black'
              variant='flat'
              name="correo"
              id="correo"
            />
          </div>
          
          <div className=" py-1 md:py-0 order-2">
            <Input
              value={data.calle}
              type="text"
              onChange={handleSetData}
              label="Calle"
			  className='text-black'
              variant='flat'
              name="calle"
              id="calle"
            />
          </div>
          <div className=" py-1 md:py-0 order-2">
            <Input
              value={data.colonia}
              type="text"
              onChange={handleSetData}
              label="Colonia"
			  className='text-black'
              variant='flat'
              name="colonia"
              id="colonia"
            />
          </div>
 		<div className=" py-1 md:py-0 order-2">
            <Input
              value={data.numeroext}
              type="text"
              onChange={handleSetData}
              label="Numero Exterior"
			  className='text-black'
              variant='flat'
              name="numeroext"
              id="numeroext"
            />
          </div>
          <div className=" py-1 md:py-0 order-2">
            <Input
              value={data.numeroint}
              type="text"
              onChange={handleSetData}
              label="Numero Interior"
			  className='text-black'
              variant='flat'
              name="numeroint"
              id="numeroint"
            />
          </div>

          <div className=" py-1 md:py-0 order-2">
            <Input
              value={data.ciudad}
              type="text"
              onChange={handleSetData}
              label="Ciudad"
			  className='text-black'
              variant='flat'
              name="ciudad"
              id="ciudad"
            />
          </div>
          <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.cp}
              type="text"
              onChange={handleSetData}
              label="Codigo Postal"
			  className='text-black'
              variant='flat'
              name="cp"
              id="cp"
            />
          </div>
          <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.curp}
              type="text"
              onChange={handleSetData}
              label="CURP"
			  className='text-black'
              variant='flat'
              name="curp"
              id="curp"
            />
          </div>
		    <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.ocupacion}
              type="text"
              onChange={handleSetData}
              label="Ocupacion"
			  className='text-black'
             variant='flat'
              name="ocupacion"
              id="ocupacion"
            />
          </div>
          <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.lugardetrabajo}
              type="text"
              onChange={handleSetData}
              label="Lugar de Trabajo"
			  className='text-black'
              variant='flat'
              name="lugardetrabajo"
              id="lugardetrabajo"
            />
          </div>
          <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.telefonodetrabajo}
              type="text"
              onChange={handleSetData}
              label="Telefono de Trabajo"
			  className='text-black'
              variant='flat'
              name="telefonodetrabajo"
              id="telefonodetrabajo"
            />
          </div>
         
        
          <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.referencia}
              type="text"
              onChange={handleSetData}
              label="Referencia"
			  className='text-black'
              variant='flat'
              name="referencia"
              id="referencia"
            />
          </div>
		  <div className=" py-1 md:py-0 order-4">
            <Input
              value={data.telefonodereferencia}
              type="text"
              onChange={handleSetData}
              label="Telefono de Referencia"
			  className='text-black'
             variant='flat'
              name="telefonodereferencia"
              id="telefonodereferencia"
            />
          </div>
          <div className="form-group mb-2 w-auto py-1 md:py-0 order-5">
			 <div className=" py-1 md:py-0 order-5 ">
           <Select
		   value={data.genero}
			items={genero}
			label="Genero"
			placeholder="selecciona el genero"
			onChange={handleSetData}
			className="max-w-xs text-black"
			id='genero'
			name='genero'
			>
    		  {(genero) => <SelectItem className='text-black' key={genero.value}>{genero.label}</SelectItem>}
    		</Select>
          </div>
          </div>
			<div className=" py-1 md:py-0 order-4">
            <Select
			value={data.estadocivil}
			items={estadocivil}
			label="Estado Civil"
			placeholder="selecciona el estado civil"
			className="max-w-xs text-black"
			onChange={handleSetData}
			id='estadocivil'
			name='estadocivil'
			>
     		 {(estadocivil) => <SelectItem className='text-black' key={estadocivil.value}>{estadocivil.label}</SelectItem>}
    		</Select>
          	</div>
        </div>  		
        <div className="flex justify-between xl:justify-end xl:gap-10 w-auto p-6 md:pt-8 xl:pt-10">
          <Button
		  	color='success'
			/* onClick={} */
            id="create-btn"
			className='text-white bg-primary shadow-md shadow-primary '
			onClick={handleRegisterCliente}
          > 
		  Registrar
		  </Button>
		  <Button
           /*  onClick={() => handleRegisterCliente} */
            id="cancelar-btn"
		  >
			Cancelar
		  </Button>
        </div>
      </form>
    </main>
  );
};

export default RegisterCliente