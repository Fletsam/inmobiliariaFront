"use client"

import useGetFraccbyId from "@/app/fraccionamientos/hooks/useGetFraccbyId"
import { RootState } from "@/store"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useGetManzanabyId from "../hooks/useGetManzanabyId"



const ManzanaId = () =>  {
  
  const params = useParams();
	const itemfind  = (parseInt(params.id));

  const {startLoadingManzana ,lotes ,manzana, dataManzana} = useGetManzanabyId() 
  const { isLogged, nombre , id } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const param = `manzanas/${itemfind}`
    startLoadingManzana(param)
  }, [dataManzana])
  
return(
  <div className="bg-white grid gap-x-5 justify-center ">
    <div className="bg-white text-black  h-[80vh] w-[80vh]">
    {lotes.map((item)=>
    <div className= "w-20 h-20 border-medium  border-black flex " key={item.id} >
      <div className={item.contratoId !== 0 ? "bg-success" : "bg-white" }>
      <h1>{item.clave}</h1>
      <h1>m² : {item.m2}m²</h1>
      </div>
    </div>
    )}
  </div>
  </div>
  
)

}
export default ManzanaId