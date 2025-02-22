
// import "./css/logo.css"
import React from "react"

function Logo(){
    return (
        <div className="flex flex-col items-center mt-8 mb-5 select-none w-auto font-bold sm:flex-row ">
            <div className="text-blue-400 p-2 text-3xl tracking-widest border-y-4 border-blue-400 rounded-sm">SIGN</div>
            <div className="bg-blue-400 ml-1 p-2 text-3xl text-white tracking-widest rounded-ms border-y-4 border-blue-400 rounded-md">SENSE</div>
        </div>
    )
}
export default Logo