"use client";
import React, { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

type Type = {
    id: number;
    nama_jenis: string;
    category: {
        id : number,
        nama: string
    };
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
const DeleteType = (params: Type) => {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleDelete = async (typeId: Number) => {
        setIsMutating(true);
        let endpoint = `${API_URL}/type/${typeId}`;
        await axios.delete(endpoint);

        setIsMutating(false);
        router.refresh();
        setModal(false);
    };
    return (
        <div className="font-montserrat">
            <button className="p-2 rounded-md text-white bg-red-600 hover:bg-red-700 border-none text-sm font2-medium" onClick={handleChange}>
                <MdDelete size='20'/>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box bg-white text-slate-950">
                    <h3 className="font-bold text-lg">
                        Are you sure to delete <span className="text-red-600">{params.nama_jenis}</span> ?
                    </h3>
                    <p className="text-grey-100">This action cannot be canceled</p>
                    <div className="modal-action">
                        <button type="button" className="btn btn-sm bg-close-btn border-none hover:bg-slate-600 font-medium text-sm text-white" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="button" onClick={() => handleDelete(params.id)} className="btn btn-sm bg-red-600 hover:bg-red-700 font-medium border-none text-white text-sm">Delete</button>
                        ) : (
                            <button type="button" className="loading loading-md bg-slate-600"></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DeleteType;
