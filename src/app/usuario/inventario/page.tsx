import { Button, Card, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

const Inventario = () => {
  return (
	<main className='w-full h-[100vh] p-2 bg-red-600 opacity-80  grid justify-items-center '>
		<section className=' '>
		<div className=' w-auto h-auto  '>
	<Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="/S_002.jpg"
        width={200}
      />
      <CardFooter className="justify-between before:bg-primary/40 border-primary/60 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button className="text-tiny text-white bg-primary/20" variant="flat" color="default" radius="lg" size="sm">
          Fraccionamientos
        </Button>
      </CardFooter>
    </Card>
			</div>
	<div className=''>
	<Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="/S_002.jpg"
        width={200}
      />
      <CardFooter className="justify-between before:bg-primary/40 border-primary/60 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button className="text-tiny text-white bg-primary/20" variant="flat" color="default" radius="lg" size="sm">
          Fraccionamientos
        </Button>
      </CardFooter>
    </Card>
			</div>
	<div className=''>
	<Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="/S_002.jpg"
        width={200}
      />
      <CardFooter className="justify-between before:bg-primary/40 border-primary/60 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button className="text-tiny text-white bg-primary/20" variant="flat" color="default" radius="lg" size="sm">
          Fraccionamientos
        </Button>
      </CardFooter>
    </Card>
			</div>
		</section>
	
		
	</main>
  )
}

export default Inventario