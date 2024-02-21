"use client"
import React, { SyntheticEvent } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";

type Category = {
    id: number;
    nama: string;
};

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
    const EditCategory = (params: Category) => {
    const [modal, setModal] = useState(false);
    const [nama, setNama] = useState(params.nama);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setNama(nama);
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);
        let endpoint = `${API_URL}/category/${params.id}`;
        const data = { 
            nama: nama 
        };
        try {
            await axios.patch(endpoint, data);
            setNama('');
            setIsMutating(false);
            setModal(false);

            router.refresh();
        } catch (error: any) {
            setIsMutating(false)
            router.refresh();
        }
    };
    return (
        <div className='font-montserrat'>
        <button className="p-2 rounded-md text-white bg-green-600 hover:bg-green-700 border-none" onClick={handleChange}>
            <TiEdit size='20' />
        </button>
        <input
            type="checkbox"
            checked={modal}
            onChange={handleChange}
            className="modal-toggle"
        />
        <div className="modal">
            <div className="modal-box bg-white border-slate-950">
            <h3 className="font-bold text-lg text-slate-800">Edit Category {params.nama}</h3>
            <form onSubmit={handleUpdate}>
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
                <button type="button" className="btn btn-sm rounded-md bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                    Close
                </button>
                {!isMutating ? (
                    <button type="submit" className="btn btn-sm rounded-md bg-blue-primary hover:bg-blue-600 font-medium border-none text-white text-sm">
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

export default EditCategory