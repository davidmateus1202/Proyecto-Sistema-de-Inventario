import SideBar from "../components/SideBar"
import HeaderProductos from "../components/HeaderProductos"
import { useState, useEffect } from "react"
import { getProducto } from "../api/apiProductos"
import { useNavigate } from "react-router-dom"
import ModalFormProductos from "../components/ModalFormProductos"
import { FaBoxOpen } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import Dropdown from "../components/Dropdown"
import { VscDebugRestart } from "react-icons/vsc";
import Notfound from "../components/Notfound"
import { motion } from "framer-motion"

function Productos() {
  const [productos, setProductos] = useState([]) // Aquí se guardan los productos
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [filterCategory, setfilterCategory] = useState(null);
  const [method, setMethod] = useState('register');
  const [selectProduct, setSelectProduct] = useState(null);

  useEffect(() => {
    getProducto((data) => {
      setProductos(data)
      setFilteredProductos(data)
    }, navigate)
  }, [navigate])

  useEffect(() => {
    if (filterCategory) {
      filtrarPorCategoria(filterCategory);
    } else {
      setProductos(filteredProductos);
    }
  }, [filterCategory, filteredProductos]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  }

  const handleEdit = (producto) => {
    setSelectProduct(producto);
    setMethod('update');
    setOpen(true);
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

  const filtrarPorCategoria = (categoria) => {
    const resultados = filteredProductos.filter((producto) =>
      producto.categoria_nombre === categoria.name_category
    );
    setProductos(resultados);
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full h-screen">
        <HeaderProductos setOpen={setOpen} setmethod={setMethod} />

        <div className="flex bg-primary m-2 rounded-t-lg items-center">
          <AiFillProduct className="text-[#d3e2f2] ml-2" />
          <h1 className="text-white text-xs md:text-sm font-semibold p-2">Productos</h1>
        </div>

        <div className="flex flex-col gap-2 items-center md:flex-row md:w-full md:justify-end md:items-center">
          <Dropdown setfilterCategory={setfilterCategory} filterCategory={filterCategory} />
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md shadow-md mr-2 w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]"
            placeholder="Buscar Producto"
            value={search}
            onChange={handleChange}
          />
          <VscDebugRestart
            className="text-white text-xl cursor-pointer mr-2 bg-green-400 rounded-md w-10 h-10 py-2 px-2 shadow-md"
            onClick={() => window.location.reload()}
          />
        </div>

        {productos.length === 0 ? (
          <Notfound />
        ) : (
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
                  <img src={producto.image} className="w-full h-72 object-cover rounded-md mb-7" alt={producto.nombre} />
                  <span className="text-gray-400">{formatCurrency(producto.precio)}</span>
                  <h3 className="font-semibold text-slate-500">{producto.nombre}</h3>
                  {
                    producto.unidades === 0 ? (
                      <h3 className="text-red-500 font-semibold">Producto no disponible</h3>

                    ) :
                      <div className="flex items-center">
                        <FaBoxOpen className="text-xl text-primary" />
                        <span className="text-primary font-bold px-2 text-xs xl:text-sm">Unidades Disponibles:</span>
                        <span className="font-semibold text-slate-400 text-xs xl:text-sm">{producto.unidades}</span>
                      </div>

                  }
                  <h3 className="w-full text-center border border-primary rounded-md mt-3 py-1 font-semibold text-xs md:text-sm">Categoria: {producto.categoria_nombre}</h3>
                  <button
                    onClick={() => handleEdit(producto)}
                    className="bg-primary text-white py-2 px-2 rounded-md shadow-md font-semibold mt-2 w-full"
                  >
                    Actualizar
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {open && <ModalFormProductos setOpen={setOpen} method={method} product={selectProduct} />}
      </div>
    </div>
  );
}

export default Productos;