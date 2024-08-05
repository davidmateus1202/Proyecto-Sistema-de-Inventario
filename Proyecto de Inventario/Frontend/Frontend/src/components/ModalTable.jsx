import TableCliente from "./TableCliente"


function ModalTable({ setOpenModal, setCliente }) {
    
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-1/2 h-[500px] overflow-y-auto bg-white py-6 px-16">
                <button onClick={() => setOpenModal(false)} className="ml-auto justify-start bg-primary py-2 px-4 rounded-full text-white font-semibold">x</button>
                <TableCliente method='select' setSelectCliente={setCliente} setOpen={setOpenModal}/>

            </div>

        </div>
    )
}

export default ModalTable
