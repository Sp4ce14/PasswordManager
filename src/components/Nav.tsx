import type React from "react";
import { FaGithub } from "react-icons/fa";

const Nav: React.FC = () => {
  return (
    <div className="bg-slate-800 display flex m-0 p-1.5 justify-between md:justify-around items-center">
        <div className="flex text-2xl font-bold">
        <div className="text-green-600">&lt;</div><div className="text-white">Pass</div><div className="text-green-600">OP/&gt;</div>
        </div>
        <button className="bg-green-700 font-semibold text-white p-1.5 rounded-3xl flex items-center gap-1.5 hover:bg-green-800 cursor-pointer"><div className="text-2xl"><FaGithub/></div>GitHub</button>
    </div>
  )
}

export default Nav