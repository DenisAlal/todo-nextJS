
"use client"
export default function Modal({ isOpen, setOpenModalWindow }) {
    if (isOpen) {
        return (
            <div className="fixed w-screen h-screen flex items-center justify-center bg-slate-900/30 backdrop-blur ">
                <div className="rounded-3xl p-10 max-w-lg flex flex-col gap-6 bg-white">

                    <h1 className="text-black font-bold text-6xl ">Модальное окно</h1>
                    <button
                        onClick={setOpenModalWindow}
                        id="btn"
                        className="bg-gray-800 w-full py-4 rounded-lg duration-500 text-white"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        )
    }
    return null
}