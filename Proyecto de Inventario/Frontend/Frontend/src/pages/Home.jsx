
import SideBar from "../components/SideBar"
import homeInicio from '../assets/home_inicio.png'


export function Home() {
  return (
    <div className="flex">

        <SideBar />
     
        <div className="flex flex-col w-full h-full bg-white">
          <div className="flex w-full h-[150px] bg-white shadow-xl mx-2 my-2 items-center">
            <img src={homeInicio} className="w-[80px] h-[80px] ml-10"/>
            <div className="flex flex-col w-auto h-full justify-center px-4">
                <h3 className="text-primary font-semibold text-xl">Bienvenido</h3>
                <span className="text-gray-200">Dasboard</span>
                <h1 className="bg-primary text-white py-2 px-2 rounded-md shadow-xl">Easy-Manager</h1>
            </div>
            

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 bg-white py-2 px-2 h-auto">

            </div>
          

        </div>

      
    </div>
  )
}


