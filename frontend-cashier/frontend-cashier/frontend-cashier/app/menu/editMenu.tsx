"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    deskripsi: string;
    jenis_id: number
}

    const API_URL = 'http://127.0.0.1:8000/api'
    const EditMenu = (menu: Menu) => {
    const [modal, setModal] = useState(false);
    const [namaMenu, setNamaMenu] = useState(menu.nama_menu);
    const [harga, setHarga] = useState(menu.harga)
    const [image, setImage] = useState(menu.image)
    const [deskripsi, setDeskripsi] = useState(menu.deskripsi)
    const [jenisId, setJenisId] = useState(menu.jenis_id)
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    const handleChange = () => setModal(!modal);
    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsMutating(true);
        let endpoint = `${API_URL}/menu/${menu.id}`;
        const data = { 
                nama_menu: namaMenu,
                harga : harga,
                image: image,
                deskripsi: deskripsi,
                jenis_id: jenisId
            };
        await axios.patch(endpoint, data);
        setNamaMenu('')
        setHarga(Number)
        setImage('')
        setDeskripsi('')
        setJenisId(Number)
        setIsMutating(false);
        router.refresh();
        setModal(false);
    };
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
            <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Category</h3>
            <form onSubmit={handleUpdate}>
            <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={namaMenu}
                                onChange={(e) => setNamaMenu(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Name Category"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Harga</label>
                            <input
                                type="number"
                                value={harga}
                                onChange={(e) => setHarga(Number(e.target.value))}
                                className="input w-full input-bordered"
                                placeholder="Harga"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Image"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Deskripsi</label>
                            <input
                                type="text"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Deskripsi"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jenis</label>
                            <input
                                type="number"
                                value={jenisId}
                                onChange={(e) => setJenisId(Number(e.target.value))}
                                className="input w-full input-bordered"
                                placeholder="Jenis"
                            />
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

export default EditMenu