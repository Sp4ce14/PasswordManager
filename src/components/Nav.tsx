import { FaGithub } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="bg-slate-800 display flex m-0 p-1.5 justify-around items-center">
        <div className="flex text-xl font-bold">
        <div className="text-green-600">&lt;</div><div className="text-white">Pass</div><div className="text-green-600">OP/&gt;</div>
        </div>
        <button className="bg-green-700  text-white p-1.5 border border-white rounded-3xl flex items-center gap-1.5 hover:bg-green-800 cursor-pointer"><div className="text-2xl"><FaGithub/></div>GitHub</button>
    </div>
  )
}

export default Nav