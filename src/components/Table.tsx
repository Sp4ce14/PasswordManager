import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type Record from "../models/record";
import type React from "react";

interface TableProps {
    records: Record[];
    setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
    toggleEdit(id: string): void
}

const Table: React.FC<TableProps> = ({ records, setRecords, toggleEdit }: TableProps) => {

    // delete logic
    const handleDelete = (id: string): void => {
        setRecords(prev => prev.filter(record => record.id != id));
    }


    return (
        records.length != 0 ?
        <div className='rounded-sm overflow-hidden overflow-x-auto'>
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
                            <tr className='text-sm font-semibold bg-green-100' key={record.id}>
                                <td className='text-center md:w-1/2 py-1.5'>{record.site}</td>
                                <td className='text-center py-3 border-x md:border-0'>{record.username}</td>
                                <td className='text-center py-3 border-x md:border-0'>{record.password}</td>
                                <td className='py-3'>
                                    <div className="flex text-2xl gap-2 justify-center">
                                        <button onClick={() => toggleEdit(record.id)} className='hover:opacity-80 cursor-pointer'>
                                            <BiSolidEditAlt />
                                        </button>
                                        <button onClick={() => handleDelete(record.id)} className='hover:opacity-80 cursor-pointer'>
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