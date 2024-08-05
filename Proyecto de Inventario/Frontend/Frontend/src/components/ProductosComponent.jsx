import { useState, useEffect } from "react"
import { getProducto } from "../api/apiProductos"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";

function ProductosComponent({ setOpenModalProdcto, setSelectProduct }) {
  const navigate = useNavigate();
  const [filteredProductos, setFilteredProductos] = useState([])
  const [productos, setProductos] = useState([])
  useEffect(() => {

    getProducto((data) => {
      setProductos(data)
      setFilteredProductos(data)
      console.log(data)
    }, navigate)

  }, [navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const handleChange = (e) => {
    filtrar(e.target.value);

  }

  const filtrar = (busqueda) => {
    if (busqueda === '') {
      setProductos(filteredProductos);
    } else {
      const resultados = filteredProductos.filter((producto) =>
        producto.nombre.toString().toLowerCase().includes(busqueda.toLowerCase())
        || producto.codigo.toString().includes(busqueda.toLowerCase())

      );
      setProductos(resultados);
    }
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
  }


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-1/2 h-[500px] overflow-y-auto bg-white py-6 px-16">
        <button onClick={() => setOpenModalProdcto(false)} className="ml-auto justify-start bg-primary py-2 px-4 rounded-full text-white font-semibold">x</button>
        <div className="bg-primary w-full h-14 rounded-md mt-2">
          <input type="text"
          onChange={handleChange}
          placeholder="Buscar producto"
          className="w-1/3 h-10 rounded-md bg-white text-black font-light text-lg px-2 my-2 mx-2" 
          />

        </div>        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-grow p-2 overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto bg-gray-50 rounded-md py-2 px-2">
            {productos.map((producto, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="block rounded-md p-4 shadow-md bg-white"
              >
                <img src={producto.image} className="w-full h-52 object-cover rounded-md mb-7" alt={producto.nombre} />
                <span className="text-gray-400">{formatCurrency(producto.precio)}</span>
                <h3 className="font-semibold text-slate-500">{producto.nombre}</h3>
                <div className="flex items-center">
                  <FaBoxOpen className="text-xl text-primary" />
                  <span className="text-primary font-bold px-2 text-xs xl:text-sm">Unidades</span>
                  <span className="font-semibold text-slate-400 text-xs xl:text-sm">{producto.unidades}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectProduct(producto)
                    setOpenModalProdcto(false)
                  }}

                  className="bg-primary text-white py-2 px-2 rounded-md shadow-md font-semibold mt-2 w-full"
                >
                  Seleccionar
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

    </div>

  )
}

export default ProductosComponent
