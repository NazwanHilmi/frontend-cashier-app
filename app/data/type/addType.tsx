"use client"

import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";


type Category = {
    id: number;
    nama: string;
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const AddType = ({category}: {category: Category[]}) => {
    const [modal, setModal] = useState(false)
    const [namaJenis, setNamaJenis] = useState("")
    const [kategoriId, setKategoriId] = useState(0)
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/type`;
        const data = {
            'nama_jenis': namaJenis,
            'kategori_id': kategoriId,
        };
        try {
            await axios.post(endpoint, data);
            setNamaJenis('');
            setKategoriId(0);
            setIsMutating(false);
            router.refresh();
            setModal(false);
        } catch (error: any) {
            setIsMutating(false);
            router.refresh();
        }
    };

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
                    <h3 className="font-bold text-lg text-slate-800">Add New Type</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={namaJenis}
                                onChange={(e) => setNamaJenis(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Type Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Category</label>
                            <div className="relative">
                                <select
                                    value={kategoriId}
                                    onChange={(e) => setKategoriId(Number(e.target.value))}
                                    className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                    placeholder="Category"
                                    defaultValue={0}
                                >
                                    <option value={0}>Choose Category</option>
                                    {category.map((category, index) =>(
                                        <option value={category.id} key={index}>
                                            {category.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
};

export default AddType;