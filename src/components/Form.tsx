import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";

const PassInput = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <input type="text" placeholder="Enter website URL" className="text-sm px-2 py-1 border border-green-300 rounded-3xl w-full" />
      <div className="flex mt-4 gap-2 relative">
        <input type="text" placeholder="Enter Username" className="text-sm px-2 py-1 border border-green-300 rounded-3xl flex-1" />
        <input type={show ? "text" : "password"} placeholder="Enter Password" className="text-sm px-2 py-1 border border-green-300 rounded-3xl" />
          <button className="text-lg hover:opacity-70 absolute right-2 cursor-pointer top-1.5" onClick={() => setShow(prev => !prev)}><BiSolidShow /></button>
        
      </div>
    </>
  )
}

export default PassInput