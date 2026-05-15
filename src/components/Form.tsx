import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidShow } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import type Record from '../models/record.ts'

interface RecordForm {
  site: string;
  username: string;
  password: string;
}

interface FormProps {
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
  setEditPressed: React.Dispatch<React.SetStateAction<boolean>>;
  records: Record[];
  editPressed: boolean;
  toEditId: string | null;
}

  const Form: React.FC<FormProps> = ({ setRecords, records, toEditId, editPressed, setEditPressed }: FormProps) => {
  const [show, setShow] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RecordForm>();
  const urlRegex: RegExp = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

  // submit logic
  const onSubmit = (formData: RecordForm) => {
    formData.site = formData.site.trim();
    formData.username = formData.username.trim();
    formData.password = formData.password.trim();
    // add logic
    if (!editPressed) {
      setRecords(prev => [...prev, {
      id: crypto.randomUUID(),
      site: formData.site,
      username: formData.username,
      password: formData.password
    }]);

    // update logic
    } else {
      let recordToEdit: Record = records.filter(record => record.id === toEditId)[0]
      if (!recordToEdit){
        alert('The record you are trying to edit has been deleted');
      } else {
        setRecords(prev => {
        return prev.map(record => record.id === toEditId ? {...record, ...formData}: record);
      })}
      setEditPressed(false);
    }
    reset({
        site: '',
        username: '',
        password: ''
      });
  }

  // prefill form logic on edit press
  useEffect(() => {
    // set if condition to escape the initial render and value initialization
    if (editPressed) {
      let prefillRecord: Record = records.filter(record => record.id == toEditId)[0];
      console.log(prefillRecord, toEditId)
      reset({
        site: prefillRecord.site,
        username: prefillRecord.username,
        password: prefillRecord.password
      })
    }
  }, [toEditId, editPressed])
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="relative">
            <input {...register("site", { required: "URL is required.", pattern: { value: urlRegex, message: "Invalid URL" } })} type="text" placeholder="Enter website URL" className="text-sm px-2 py-2 pr-10 border border-green-300 rounded-3xl h-10 w-full" />
          </div>
          <div className="h-5 ml-3 text-sm text-red-600">{errors.site?.message}</div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <div className="flex flex-col md:flex-1">
            <div className="relative">
              <input {...register("username", { required: "Username is required." })} type="text" placeholder="Enter Username" className="text-sm px-2 pr-10 border border-green-300 rounded-3xl h-10 w-full" />
            </div>
            <div className="h-5 ml-3 text-sm text-red-600">{errors.username?.message}</div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <input {...register("password", { required: "Password is required." })} type={show ? "text" : "password"} placeholder="Enter Password" className="text-sm px-2 pr-10 border border-green-300 rounded-3xl h-10 w-full" />
              <button type="button" className="text-lg hover:opacity-70 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShow(prev => !prev)}><BiSolidShow /></button>
            </div>
            <div className="h-5 ml-3 text-sm text-red-600">{errors.password?.message}</div>
          </div>
        </div>
        <div className="flex justify-center gap-x-3">
          {editPressed && (
            <button type="submit" className="mt-2 bg-red-100 border-red-300 border rounded-3xl py-2 px-4 font-semibold hover:opacity-90 cursor-pointer" onClick={() => { setEditPressed(false); reset({
        site: '',
        username: '',
        password: ''
      }) }}>
            <div className="flex gap-2 items-center">
              <div className="text-[25px]"><MdCancel /></div> <div className="text-sm">Cancel</div>
            </div>
          </button>
          )}
          <button type="submit" className="mt-2 bg-green-400 border-green-600 border rounded-3xl py-2 px-6 font-semibold hover:opacity-90 cursor-pointer">
            <div className="flex gap-2 items-center">
              {editPressed ? (<><div className="text-[25px]"> <RxUpdate /></div> <div className="text-sm">Update</div></>) : (<><div className="text-[25px]"> <FaRegSave /></div> <div className="text-sm">Save</div></>)}
            </div>
          </button>
        </div>
      </form>
    </>
  )
}

export default Form