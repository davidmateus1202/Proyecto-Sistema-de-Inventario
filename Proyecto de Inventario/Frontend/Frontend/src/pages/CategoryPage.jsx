import SideBar from "../components/SideBar"
import Header from "../components/Header"
import { AiFillProduct } from "react-icons/ai";
import { useState, useEffect } from "react";
import ModalForm from "../components/ModalForm";
import { getCategory } from "../api/apiCategorys";


export function CategoryPage() {

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState([])

  useEffect(() => {

    getCategory(setCategory)
  }, [])

  return (
    <div className="flex">

      <SideBar />

      <div className="flex flex-col w-full h-full">
        <Header openModal={setOpen} />

        <div className="w-full h-auto">
          <div className=" flex items-center bg-[#413ec4] mx-2 px-2 py-1 my-2 rounded-t-lg">
            <AiFillProduct className="text-[#d3e2f2]" />
            <h1 className="text-white ml-2 font-semibold">Categorias</h1>
          </div>

          

        </div>


        {open && <ModalForm setOpen={setOpen} />}



      </div>




    </div>
  )
}
