
import SideBar from "../components/SideBar"

export default function Clientes() {
  return (
    <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full h-screen bg-gray-100 px-4">
          <div className="flex flex-row w-auto h-[50px] bg-primary my-4 rounded-t-lg border border-blue-300 shadow-md">
            <img src="./src/assets/cliente.png" className="w-[30px] h-[30px] mt-2 ml-2"/>
            <h1 className="text-white font-semibold text-xl m-3">Clientes</h1>
          </div>

          <div className="flex w-auto h-[400px] bg-white shadow-2xl items-center justify-center">

            <div>
              <h1>fdfdsfsdfdff</h1>
            </div>
            <div className="h-full w-1/2 ml-auto">

              <img src="./src/assets/azul.jpg" className="object-cover h-[400px] w-full shadow-md" />
            </div>
            

          </div>
            
        </div>
    </div>
  )
}
