import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import type Record from "../models/record";
import type React from "react";
import { toast } from "react-toastify";


interface TableProps {
    records: Record[];
    setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
    triggerEdit(id: string): void;
}

const Table: React.FC<TableProps> = ({ records, setRecords, triggerEdit }: TableProps) => {

    // delete logic
    const handleDelete = (id: string): void => {
        setRecords(prev => prev.filter(record => record._id != id));
    }

    const handleCopy = async (text: string): Promise<void> => {
        await toast.promise(navigator.clipboard.writeText(text),
            {
                pending: "Copying to Clipboard",
                success: "Copied to Clipbboard",
                error: "Failed to copy"
            });
    }

    return (
        records.length != 0 ?
            <div className='rounded-sm overflow-hidden overflow-x-auto w-full'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-emerald-800 text-white'>
                            <th className='md:w-1/2 font-medium py-1.5'>Site</th>
                            <th className='font-medium py-1.5'>Username</th>
                            <th className='font-medium py-1.5'>Password</th>
                            <th className='font-medium py-1.5'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(record => (
                            <tr className='text-sm font-semibold bg-green-100' key={record._id}>
                                <td className='md:w-1/2 py-1.5'><div className="flex justify-center items-center gap-x-0.5"><a href={record.site}>{record.site}</a><button className="cursor-pointer hover:opacity-70" onClick={() => handleCopy(record.site)}><FaCopy /></button></div></td>
                                <td className='py-3 border-x md:border-0'><div className="flex justify-center items-center gap-x-0.5">{record.username} <button className="cursor-pointer hover:opacity-70" onClick={() => handleCopy(record.username)}><FaCopy /></button></div></td>
                                <td className='py-3 border-x md:border-0'><div className="flex justify-center items-center gap-x-0.5">{record.password} <button className="cursor-pointer hover:opacity-70" onClick={() => handleCopy(record.password)}><FaCopy /></button></div></td>
                                <td className='py-3'>
                                    <div className="flex text-2xl gap-2 justify-center">
                                        <button onClick={() => triggerEdit(record._id)} className='hover:opacity-80 cursor-pointer'>
                                            <BiSolidEditAlt />
                                        </button>
                                        <button onClick={() => handleDelete(record._id)} className='hover:opacity-80 cursor-pointer'>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <div>No Records to show</div>
    )
}

export default Table