
import SideBar from "../components/SideBar"
import { useState, useEffect } from "react"


function Facturador() {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);


  useEffect(() => {

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }


  })


  
  return (
    <div className="flex">

        <SideBar/>
        {
          isDesktop ? (
            <div className="flex flex-col w-full h-screen bg-gray-100 px-4">
              <div className="flex h-[50px] w-auto bg-primary my-4 rounded-t-lg border-blue-300 shadow-md items-center">
                <img src="./src/assets/factura3.png" className="w-[40px] h-[40px] bg-white px-1 py-1 ml-2 rounded-md shadow-white"/>
                <h1 className="text-white font-semibold text-xl m-3">Factura</h1>

              </div>

              <div className="flex w-auto h-[400px] bg-white shadow-xl items-center justify-center">
                <div className="flex w-1/2 h-full items-center justify-start">
                <img src="./src/assets/azul.jpg" className="object-cover h-[400px] w-1/3" alt="azul" />
                  <div className="flex w-full h-full items-center justify-center">
                  <div className="bg-gray-100 py-8 px-8 rounded-xl shadow-xl">
                    <img src="./src/assets/imageNoFound.png" className="w-[250px] h-[250px]"/>
                    
                    </div>

                  </div>

                </div>
                <div className="h-5/6 border-l border-x-2 border-primary shadow-md "></div>
                <div className="w-1/2 h-full ">

                </div>
                
              </div>

              
            </div>
          ) : 
          (
            <div className="flex flex-col items-center justify-center w-full">
              <img className="w-[200px] h-[200px]"
              src="./src/assets/error2.png"/>
              <h3 className="font-semibold text-center text-primary py-10 px-5 shadow-lg">Por favor despliega la pantalla completa para renderizar el contenido</h3>
            </div>
          )
        }
      
    </div>
  )
}

export default Facturador
