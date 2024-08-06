import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import ModalTable from "../components/ModalTable";
import ProductosComponent from "../components/ProductosComponent";
import toast from "react-hot-toast";
import { ventas, ventasDetalle, facuras } from "../api/apiVentas";

function Facturador() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [cliente, setCliente] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const [openModalProdcto, setOpenModalProdcto] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tipo, setTipo] = useState(null);
  const [productosFactura, setProductosFactura] = useState([]);

  // Variables para enviar a la base de datos
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [total, setTotal] = useState(null);
  const [totalFactura, setTotalFactura] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addProduct = (id, nombre, actualPrecio) => {
    const actualTotal = cantidad * actualPrecio;
    if (cantidad > productos.unidades) {
      toast.error("La cantidad de productos supera el stock");
      // Clear the form
      setCantidad('');
      setPrecio('');
      setTotal(null);

    } else {
      if (id && cantidad && actualPrecio && nombre) {
        setProductosFactura([
          ...productosFactura,
          { id, nombre, cantidad, precio: actualPrecio, total: actualTotal }
        ]);
        setTotalFactura(preV => preV + actualTotal);

        // Clear the form
        setCantidad('');
        setPrecio('');
        setTotal(null);
      } else {
        toast.error("Faltan datos del producto");
        console.error("Faltan datos del producto");
      }
    }

  };


  useEffect(() => {
    console.log("Productos en factura:", productosFactura);
  }, [productosFactura]);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };


  const handleVenta =async (total, id) => {

    const response = await ventas(total, id);
    if (response.status === 200 || response.status === 201) {
      
      const VentasId = response.data.id;
      console.log("Venta creada con id:", VentasId);

      await ventasDetalle(VentasId, productosFactura);
      await facuras(VentasId);
      setProductosFactura([]);
      setTotalFactura(0);
      

    } else {
      toast.error('Error al realizar la venta');
    }


  }

  return (
    <div className="flex">
      <SideBar />
      {isDesktop ? (
        <div className="flex flex-col w-full h-screen bg-white px-4">
          <div className="flex h-[50px] w-auto bg-primary my-4 rounded-t-lg border-blue-300 shadow-md items-center">
            <img src="./src/assets/factura3.png" className="w-[40px] h-[40px] bg-white px-1 py-1 ml-2 rounded-md shadow-white" />
            <h1 className="text-white font-semibold text-xl m-3">Factura</h1>
          </div>

          <div className="flex w-auto h-[500px] bg-white shadow-xl items-center justify-center rounded-3xl">
            <div className="flex w-1/2 h-full items-center justify-start">
              <img src="./src/assets/azul.jpg" className="object-cover h-[500px] w-1/3 rounded-s-3xl" alt="azul" />
              <div className="flex w-full h-full items-center justify-center">
                <img src={productos.image_url ? productos.image_url : './src/assets/imagen5.png'} className="w-[250px] h-[250px] xl:w-[350px] xl:h-[350px] rounded-md" />
              </div>
            </div>
            <div className="h-5/6 border-l border-x-2 border-primary shadow-md "></div>

            <div className="flex w-1/2 h-full items-center justify-start">
              <div className="flex flex-col w-full h-full items-center justify-center">
                <h1 className="text-primary font-semibold text-2xl">Crea tu Factura</h1>
                <div className="flex w-full px-5">
                  <input
                    type="text"
                    readOnly
                    placeholder={cliente.nombre ? cliente.nombre : 'Cliente'}
                    className="border border-gray-300 p-2 rounded-md shadow-md w-full my-3"
                  />
                  <button
                    onClick={() => {
                      setCliente([]);
                      setOpenModal(true);
                    }}
                  >
                    <img src="./src/assets/found.png" className="w-[35px] h-[35px] mr-2 ml-2" />
                  </button>
                </div>

                <div className="flex w-full px-5">
                  <input
                    type="text"
                    readOnly
                    placeholder={productos.nombre ? productos.nombre : 'Producto'}
                    className="border border-gray-300 p-2 rounded-md shadow-md w-full my-3"
                  />
                  <button
                    onClick={() => {
                      setOpenModalProdcto(true);
                    }}
                  >
                    <img src="./src/assets/found.png" className="w-[35px] h-[35px] mr-2 ml-2" />
                  </button>
                </div>

                <div className="flex w-full px-5 gap-5">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    className="border border-gray-300 p-2 rounded-md shadow-md w-full my-3"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder={productos.precio ? formatCurrency(productos.precio) : 'Precio'}
                    className="border border-gray-300 p-2 rounded-md shadow-md w-full my-3"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>

                <div className="w-full px-5">
                  <button
                    onClick={() => {
                      const precioFinal = precio || productos.precio;
                      if (precioFinal) {
                        console.log("Precio:", precioFinal);
                        addProduct(productos.id, productos.nombre, precioFinal);
                      } else {
                        toast.error("Faltan datos del producto");
                      }
                    }}
                    className="mt-5 w-full text-center bg-primary text-white py-2 rounded-md shadow-md hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                </div>
              </div>
              <img src="./src/assets/azul.jpg" className="object-cover h-[500px] w-1/3 rounded-e-3xl" alt="azul" />
            </div>
          </div>
          <div className="w-full h-screen mt-5 overflow-y-auto shadow-xl">
            <table className="table-auto border-collapse w-full text-sm text-slate-500">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-slate-300 p-2">Nombre de producto</th>
                  <th className="border border-gray-300 bg-slate-300 p-2">Cantidad</th>
                  <th className="border border-gray-300 bg-slate-300 p-2">Precio</th>
                  <th className="border border-gray-300 bg-slate-300 p-2">Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Array.isArray(productosFactura) && productosFactura.map((producto, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 bg-gray-200 p-2">{producto.nombre}</td>
                    <td className="border border-gray-300 bg-gray-200 p-2">{producto.cantidad}</td>
                    <td className="border border-gray-300 bg-gray-200 p-2">{formatCurrency(producto.precio)}</td>
                    <td className="border border-gray-300 bg-gray-200 p-2">{formatCurrency(producto.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div className="flex w-full h-[200px] my-2 bg-primary items-center justify-end">
          <button 
            onClick={() => handleVenta(totalFactura, cliente.id)}
            className="text-white bg-[#20e952] font-semibold py-2 rounded-md shadow-md px-6">
              facturar

            </button>
            <h3 className="text-red-600 bg-white mx-5 py-2 px-12 font-semibold text-xl rounded-md">{formatCurrency(totalFactura)}</h3>
            
            

          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <img className="w-[200px] h-[200px]" src="./src/assets/error2.png" />
          <h3 className="font-semibold text-center text-primary py-10 px-5 shadow-lg">
            Por favor despliega la pantalla completa para renderizar el contenido
          </h3>
        </div>
      )}

      {openModal && <ModalTable setOpenModal={setOpenModal} setCliente={setCliente} />}
      {openModalProdcto && <ProductosComponent setOpenModalProdcto={setOpenModalProdcto} setSelectProduct={setProductos} />}
    </div>
  );
}

export default Facturador;
