import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { getCategory } from '../api/apiCategorys';
import { useNavigate } from 'react-router-dom';
import UploadFile from '../components/uploadFile';
import { createProducto, updateProducto } from '../api/apiProductos';
import toast from 'react-hot-toast';

function ModalFormProductos({ setOpen, method, product }) {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, setValue,formState: { errors } } = useForm();
  const isDesktop = window.innerWidth > 824;

  useEffect(() => {
    console.log(product);
    getCategory(setCategory, navigate);

    if(method === 'update'){
      setValue('nombre', product.nombre);
      setValue('unidades', product.unidades);
      setValue('precio', product.precio);
      setValue('codigo', product.codigo);
      setValue('precio_compra', product.precio_compra);

    }
  }, [method, product, setValue]);

  
  const onSubmit = handleSubmit(async (data) => {


    try {
      if (method === 'register') {
        if (!selectedCategory) {
          toast.error('Debes seleccionar una categoría');
          return;
        }else {
          await createProducto(data, selectedCategory.id, file);

        }
        
      } else {
        await updateProducto(data, product);
      }
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
      <form onSubmit={onSubmit} className="flex flex-col overflow-y-auto bg-white gap-5 w-[500px] rounded-t-lg">
        <div className='relative'>
        {
          method === 'register' ? <></> : (
            <img src={product.image} className='w-full h-52 object-cover rounded-md mb-7'/>
          )
        }
        <button onClick={() => setOpen(false)}
        className='absolute top-2 right-2 bg-primary py-2 px-4 text-white font-semibold rounded-full'>x
        </button>
        </div>

        <div className='flex flex-col gap-5 m-10 '>
        <h1 className='text-2xl text-primary font-bold gap-3'>
          {method === 'register' ? 'Registra tu producto' : 'Actualiza tu producto'}
        </h1>
        <div className='flex '>
          <div className='flex flex-col'>
            <input type="text"
              className={`border border-gray-300 p-2 rounded-md shadow-md ${ isDesktop ? '' : 'w-[200px]' }`}
              placeholder='Nombre'
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
              className={`border border-gray-300 p-2 rounded-md shadow-md ml-2 ${ isDesktop ? '' : 'w-[100px]' }`}
              placeholder='Unidades'
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
          placeholder='Precio Compra'
          {...register('precio_compra', {
            required: {
              value: true,
              message: 'Campo requerido'
            },
            valueAsNumber: true,
            validate: value => !isNaN(value) || 'Solo se permiten números',
          })}
        />
        {errors.precio && <span className="text-red-500 text-xs">{errors.precio.message}</span>}
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

        {
          method === 'register' ? (
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
          )
          :
          <></>
        }

        <input type="number"
          className='w-full border border-gray-300 p-2 rounded-md shadow-md'
          placeholder='Código de Referencia'
          {...register('codigo', {
            required: {
              value: true,
              message: 'Campo requerido'
            },
          })}
        />
        {errors.codigo && <span className="text-red-500 text-xs">{errors.codigo.message}</span>}

        {
          method === 'register' ? (
            <UploadFile setFile={setFile} file={file} />
          )
          :
          <></>
        }

        <button className='mt-8 w-full border border-primary p-2 rounded-md shadow-md font-bold text-primary bg-white'
          type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default ModalFormProductos;
