"use client";
import React, { SyntheticEvent, use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Type = {
    id: number;
    nama_jenis: string;
    kategori_id: number;
}

const API_URL = "http://127.0.0.1:8000/api";
const DeleteType = (type: Type) => {
    const [modal, setModal] = useState(false);
    const [namaJenis, setNamaJenis] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleDelete = async (typeId: Number) => {
        setIsMutating(true);
        let params = { id: typeId }
        let endpoint = `${API_URL}/type/${typeId}`;
        const data = { nama_jenis: namaJenis };
        await axios.delete(endpoint);

        setIsMutating(false);
        router.refresh();
        setModal(false);
    };
    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Delete
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are sure to delete {type.nama_jenis} ?
                    </h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(type.id)}
                                className="btn btn-primary"
                            >
                                Delete
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                                Delete loading ...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DeleteType;
