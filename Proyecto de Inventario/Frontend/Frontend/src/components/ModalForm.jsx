import { createCategory, updateCategory } from "../api/apiCategorys";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function ModalForm({ setOpen, setCategories, method, category }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (method === 'update' && category) {
      setValue('name_category', category.name_category);
    }
  }, [method, category, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (method === 'register') {
        await createCategory(data, setCategories);
        window.location.reload();
      } else {
        await updateCategory(category.id, data, navigate);
        window.location.reload();
        

      }
      setOpen(false);
    } catch (error) {
        console.log(error)
    }
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <form onSubmit={onSubmit} className="flex flex-col bg-white gap-5 py-16 px-10 ">
        <button onClick={() => setOpen(false)} className="ml-auto justify-start bg-primary py-2 px-4 rounded-full text-white font-semibold">x</button>
        <h1 className="font-bold text-xs md:text-xl text-primary">
          {method === 'register' ? 'Registra tu categoria' : 'Actualiza tu categoria'}
        </h1>
        <label htmlFor="name_category" className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input
            type="text"
            className="md:w-[400px] border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2 ml-2 font-light"
            {...register("name_category", {
              required: {
                value: true,
                message: "Campo requerido"
              }
            })}
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Nombre de categoria
          </span>
        </label>
        {errors.name_category && <span className="text-red-500 text-xs">{errors.name_category.message}</span>}
        <button type="submit" className="bg-primary text-white py-2 rounded-md shadow-md font-semibold">Guardar</button>
      </form>
    </div>
  );
}

export default ModalForm;
