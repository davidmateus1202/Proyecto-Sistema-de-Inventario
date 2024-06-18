


function Header({ openModal }) {


    return (
        <div className="flex flex-col sm:flex-row  py-3 sm:py-2 px-2 bg-gray-200 w-full h-32 items-center justify-center sm:justify-normal">
            <div className="shrink w-auto flex-col-1 sm:px-12 lg:px-24">
                <h1 className="text-xs sm:text-md mb-2 font-bold md:text-3xl"> Crea tu nueva categoria! 💁</h1>
                <p className="text-xs sm:text-md ml-6 text-gray-400 font-semibold">Ordena mejor tus productos con categorias</p>

            </div>

            <button onClick={() => openModal(true)}
            className="flex md:ml-auto md:mr-24 font-semibold text-xs sm:text-sm mt-3 sm:mt-0 bg-[#34339a] text-white py-2 px-2 rounded-md shadow-md">Añadir</button>

            


        </div>

    )
}

export default Header
  