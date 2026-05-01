import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";

const Form = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <input type="text" placeholder="Enter website URL" className="text-sm px-2 py-2 border border-green-300 rounded-3xl w-full" />
      <div className="flex flex-col md:flex-row mt-2 md:mt-4 gap-2 relative">
        <input type="text" placeholder="Enter Username" className="text-sm px-2 py-2 border border-green-300 rounded-3xl md:flex-1" />
        <input type={show ? "text" : "password"} placeholder="Enter Password" className="text-sm px-2 py-2 border border-green-300 rounded-3xl" />
          <button className="text-lg hover:opacity-70 absolute right-2.5 bottom-2.5 md:right-2.5 md:top-2.5 cursor-pointer" onClick={() => setShow(prev => !prev)}><BiSolidShow /></button>
      </div>
      <div className="flex justify-center mt-5">
        <button className="bg-green-400 border-green-600 border rounded-3xl py-2 px-6 font-semibold hover:opacity-90 cursor-pointer">
          <div className="flex gap-2 items-center">
            <div className="text-[25px]"><FaRegSave /></div> <div className="text-sm">Save</div>
          </div>
          </button>
        </div>
      
    </>
  )
}

export default Form