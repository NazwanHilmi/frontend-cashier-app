"use client"
import React, { SyntheticEvent, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import useSWR from 'swr';

type Type = {
    id: number;
    nama_jenis: string;
    kategori_id: number;
}

    const API_URL = 'http://127.0.0.1:8000/api'
    const EditType = (type: Type) => {
    const [modal, setModal] = useState(false);
    const [namaJenis, setNamaJenis] = useState(type.nama_jenis);
    const [kategoriId, setKategoriId] = useState(type.kategori_id)
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsMutating(true);
        let endpoint = `${API_URL}/type/${type.id}`;
        const data = {
            id: type.id,
            nama_jenis: namaJenis,
            kategori_id: kategoriId,
        };
        try {
            await axios.patch(endpoint, data);
            setNamaJenis('');
            setKategoriId(Number);
            setIsMutating(false);
            router.refresh();
            setModal(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };

    const getCategory = async () => {
        console.log("Fetching categories...");
        const res = await axios.get('http://localhost:8000/api/category');
        console.log("Categories fetched:", res.data.data);
        return res.data.data;
    };
    
    const { data: categories, error: categoriesError } = useSWR('http://localhost:8000/api/category', getCategory);

    useEffect(() => {
    console.log(categories);
    }, [categories]);


    return (
        <div>
        <button className="btn" onClick={handleChange}>
            Edit
        </button>
        <input
            type="checkbox"
            checked={modal}
            onChange={handleChange}
            className="modal-toggle"
        />
        <div className="modal">
            <div className="modal-box">[]
            <h3 className="font-bold text-lg">Edit Jenis</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                <label className="label font-bold">Name</label>
                <input
                    type="text"
                    value={namaJenis}
                    onChange={(e) => setNamaJenis(e.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Name Category"
                />
                </div>
                <div className="form-control">
                            <label className="label font-bold t">Kategori</label>
                            <div className="relative">
                                <select
                                    value={kategoriId}
                                    onChange={(e) => setKategoriId(Number(e.target.value))}
                                    className="input w-full input-bordered text-white"
                                    placeholder="Kategori"
                                >
                                    {Array.isArray(categories) && categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.nama}
                                        </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                <div className="modal-action">
                <button type="button" className="btn" onClick={handleChange}>
                    Close
                </button>
                {!isMutating ? (
                    <button type="submit" className="btn bg-gray-500">
                    Submit
                    </button>
                ) : (
                    <button type="button" className="btn loading">
                    Submit loading ...
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default EditType