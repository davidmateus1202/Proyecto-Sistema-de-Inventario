import SideBar from "../components/SideBar"
import Header from "../components/Header"
import { AiFillProduct } from "react-icons/ai";
import { useState, useEffect } from "react";
import ModalForm from "../components/ModalForm";
import { getCategory } from "../api/apiCategorys";
import TableCategory from "../components/TableCategory";
import { useNavigate } from "react-router-dom";

export function CategoryPage() {

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    getCategory(setCategory, navigate)
    console.log(category)
  }, [])

  return (
    <div className="flex">

      <SideBar />

      <div className="flex flex-col w-full h-full">
        <Header openModal={setOpen} />

        <div className="w-full h-full">
          <div className=" flex items-center bg-[#413ec4] mx-2 px-2 py-1 my-2 rounded-t-lg">
            <AiFillProduct className="text-[#d3e2f2]" />
            <h1 className="text-white ml-2 font-semibold">Categorias</h1>
          </div>

          <div className="overflow-y-auto max-h-96">
          <table className="table-auto border-collapse w-full text-sm shadow-md">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> # </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> Nombre de Categoria </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> Acciones </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-slate-800">
              {
                category.map((category, index) => (
                  <tr key={index}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{index}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{category.name_category}</td>

                  </tr>
                ))
              }

            </tbody>
          </table>

          </div>


        </div>


        {open && <ModalForm setOpen={setOpen} setCategory={setCategory} />}



      </div>




    </div>
  )
}
