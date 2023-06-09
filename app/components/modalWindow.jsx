
"use client"
export default function Modal({ isOpen, setOpenModalWindow }) {
    if (isOpen) {
        return (
            <div className="fixed w-screen h-screen flex items-center justify-center bg-slate-900/30 backdrop-blur ">
                <div className="rounded-3xl p-10 max-w-lg flex flex-col gap-6 bg-white">

                    <h1 className="text-black font-bold text-6xl ">Thanks for subscribing!</h1>
                    <p className="text-lg text-black">
                        A confirmation email has been sent to
                        <span className="text-black font-bold"> email@company.com</span>. Please
                        open it and click the button inside to confirm your subscription.
                    </p>
                    <button
                        onClick={setOpenModalWindow}
                        id="btn"
                        className="bg-gray-800 w-full py-4 rounded-lg duration-500 text-white"
                    >
                        Login message
                    </button>
                </div>
            </div>
        )
    }
    return null
}