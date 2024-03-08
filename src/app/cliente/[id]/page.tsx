import NavbarInicio from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
	<main className='text-black '>
		<NavbarInicio>
			  
		</NavbarInicio>
		<section className='bg-white w-full flex'>
			<div className='w-1/2'>
				<div className='bg-black h-max flex'>
			<div className='bg-slate-100 w-1/2'>
				Foto
			</div>
			<div className='bg-red-300 w-1/2'>
					nombre, telefono, direccion
			</div>
			</div>
			<div className='bg-blue-500/50 w-auto'>
				Informacion 
			</div>
			</div>
		<div className='bg-orange-500/50 w-1/2'>
		contratos

		</div>	
			

		</section>



	</main>
  )
}

export default page