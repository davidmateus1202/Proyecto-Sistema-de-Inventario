import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategory } from '../api/apiCategorys';
import { useNavigate } from 'react-router-dom';
import UploadFile from '../components/uploadFile';
import { createProducto } from '../api/apiProductos';
import toast from 'react-hot-toast';

function ModalFormProductos({ setOpen }) {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getCategory(setCategory, navigate);
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!selectedCategory) {
      toast.error('Debes seleccionar una categoría');
      return;
    }

    try {
      await createProducto(data, selectedCategory.id, file);
      window.location.reload();
      setOpen(false);
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  });

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <form onSubmit={onSubmit} className="flex flex-col overflow-y-auto bg-white gap-5 py-16 px-10 md:px-30">
        <button onClick={() => setOpen(false)}
        className='ml-auto justify-start bg-primary py-2 px-4 rounded-full text-white font-semibold'>x</button>
        <h1 className='text-2xl text-primary font-bold gap-3'>
          Agrega un producto
        </h1>
        <div className='flex '>
          <div className='flex flex-col'>
            <input type="text"
              className='border border-gray-300 p-2 rounded-md shadow-md'
              placeholder='Nombre del producto'
              {...register('nombre', {
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
              })}
            />
            {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
          </div>
          
          <div className='flex flex-col'>
            <input type="number"
              className='border border-gray-300 p-2 rounded-md shadow-md ml-2'
              placeholder='Cantidad'
              {...register('unidades', {
                required: {
                  value: true,
                  message: 'Campo requerido'
                }
              })}
            />
            {errors.unidades && <span className="text-red-500 text-xs">{errors.unidades.message}</span>}
          </div>
        </div>
        <input type="number"
          className='w-full border border-gray-300 p-2 rounded-md shadow-md'
          placeholder='Precio'
          {...register('precio', {
            required: {
              value: true,
              message: 'Campo requerido'
            },
            valueAsNumber: true,
            validate: value => !isNaN(value) || 'Solo se permiten números',
          })}
        />
        {errors.precio && <span className="text-red-500 text-xs">{errors.precio.message}</span>}

        <div className={`h-auto  relative flex-col items-center w-full`}>
          <button className='w-full border border-white p-2 rounded-md shadow-md font-bold text-white bg-primary'
            onClick={toggleDropdown}>
            {selectedCategory ? selectedCategory.name_category : 'Selecciona una categoría'}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white border mt-1 rounded shadow-lg w-full max-h-40 overflow-y-auto">
              {category.map((cat) => (
                <div onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                  key={cat.id} className="p-2 hover:bg-gray-200 cursor-pointer">{cat.name_category}</div>
              ))}
            </div>
          )}
        </div>

        <input type="number"
          className='w-full border border-gray-300 p-2 rounded-md shadow-md'
          placeholder='Código de referencia'
          {...register('codigo', {
            required: {
              value: true,
              message: 'Campo requerido'
            },
          })}
        />
        {errors.codigo && <span className="text-red-500 text-xs">{errors.codigo.message}</span>}

        <UploadFile setFile={setFile} file={file} />

        <button className='mt-8 w-full border border-primary p-2 rounded-md shadow-md font-bold text-primary bg-white'
          type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default ModalFormProductos;
