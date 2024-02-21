"use client"
import React, { SyntheticEvent, useState } from 'react'
import { useRouter } from "next/navigation";
import axios from 'axios';
import { FaPlus } from "react-icons/fa";


const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const AddCategory = () => {
    const [modal, setModal] = useState(false)
    const [nama, setNama] = useState("")
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => {
        setModal(!modal);
        setNama('');
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        setIsMutating(true)

        let endpoint = `${API_URL}/category`
        const data = { nama: nama }
        await axios.post(endpoint, data);

        setNama('')
        setIsMutating(false);
        router.refresh()
        setModal(false)
    }
    return (
        <div className='font-montserrat'>
            <button className="btn text-white bg-blue-primary hover:bg-blue-600 border-none text-sm font-medium" onClick={handleChange}>
                <FaPlus size='20'/>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box bg-white border-slate-950">
                    <h3 className="font-bold text-lg text-slate-800">Add New Category</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold text-slate-800">Name</label>
                            <input
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Name Category"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                            <button type="submit" className="btn btn-sm bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
                                Submit
                            </button>
                            ) : (
                            <button type="button" className="loading loading-md bg-slate-600"></button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory