
import SideBar from "../components/SideBar"
import HeaderProductos from "../components/HeaderProductos"
import { useState, useEffect } from "react"
import { getProducto } from "../api/apiProductos"
import { useNavigate } from "react-router-dom"
import ModalFormProductos from "../components/ModalFormProductos"


function Productos() {

  const [productos, setProductos] = useState([]) // Aquí se guardan los productos
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducto((data) => {
      setProductos(data)
    }, navigate)


  }, [navigate])

  return (
    <div className="flex">
        <SideBar/>
        <div className="flex flex-col w-full h-full">
            <HeaderProductos setOpen={setOpen}/>

      
              {
                productos.map((productos, index) => (
                  <div key={index}>
                  <h3>{productos.nombre}</h3>
                  <p>{productos.unidades}</p>
                  <p>{productos.precio}</p>
                  <img src={productos.image_url} alt="" />


                </div>
                ))
              }
          {open && <ModalFormProductos setOpen={setOpen}/>}

        </div>

      
      
    </div>
  )
}

export default Productos
