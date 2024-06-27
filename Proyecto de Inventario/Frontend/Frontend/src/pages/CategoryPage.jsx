import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { AiFillProduct } from "react-icons/ai";
import { useState, useEffect } from "react";
import ModalForm from "../components/ModalForm";
import { getCategory, deleteCategory } from "../api/apiCategorys";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";

export function CategoryPage() {

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [method, setMethod] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategory((data) => {
      setCategories(data);
      setFilteredCategories(data);
    
    }, navigate)
  }, [navigate]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setMethod('update');
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteCategory(id, setCategories, navigate);
    window.location.reload();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);

  };



  const filtrar = (busqueda) => {
    if (busqueda === '') {
      setCategories(filteredCategories);
    } else {
      const resultados = filteredCategories.filter((category) => 
        category.name_category.toString().toLowerCase().includes(busqueda.toLowerCase())
      );
      setCategories(resultados);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full h-full">
        <Header openModal={setOpen} method={setMethod} />
        <div className="w-full h-full">
          <div className="flex items-center bg-[#413ec4] ml-2 mr-6 px-2 py-1 my-2 rounded-t-lg">
            <AiFillProduct className="text-[#d3e2f2]" />
            <h1 className="text-white ml-2 font-semibold">Categorias</h1>
          </div>
          <div className="flex justify-end mr-2 items-center ">
            <div className="bg-primary pt-3  mb-3 px-2 rounded-s-md">
            <IoSearchOutline className="text-white dark:text-slate-200 text-2xl mb-2" />
            </div>

            <input type="text"
              className="border border-slate-200 dark:border-slate-700 rounded-e-md p-2 shadow-md w-auto md:w-96 mb-3 mr-4"
              placeholder="Buscar categoria"
              value={search}
              onChange={handleChange}
                 
            />
            
          </div>
          <div className="overflow-y-auto max-h-96 px-2">
            <table className="table-auto border-collapse w-full text-sm shadow-xl">
              <thead>
                <tr>
                  <th className="border-b  font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center bg-slate-200">#</th>
                  <th className="border-b  font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-center bg-slate-200">Nombre de Categoria</th>
                  <th className="border-b  font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left bg-slate-200">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 text-center items-center">
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 font-semibold ">{index + 1}</td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-16 text-slate-500 dark:text-slate-400 text-md">{category.name_category}</td>
                    <td className="flex border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                      <div onClick={() => handleDelete(category.id)} className="bg-red-600 py-2 px-2 shadow-md rounded-md cursor-pointer">
                        <MdDelete className="text-xl text-white" />
                      </div>
                      <div onClick={() => handleEdit(category)} className="bg-primary py-2 px-2 shadow-md rounded-md cursor-pointer ml-8">
                        <CiEdit className="text-xl text-white" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {open && <ModalForm setOpen={setOpen} setCategories={setCategories} method={method} category={selectedCategory} />}
      </div>
    </div>
  );
}
