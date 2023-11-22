"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const AddMenu = () => {
    const [modal, setModal] = useState(false)
    const [namaMenu, setNamaMenu] = useState("")
    const [harga, setHarga] = useState("")
    const [image, setImage] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [jenisId, setJenisId] = useState("")
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => setModal(!modal)
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        let endpoint = `${API_URL}/menu`
        const data = {
                nama_menu: namaMenu,
                harga : harga,
                image: image,
                deskripsi: deskripsi,
                jenis_id: jenisId
            }
        await axios.post(endpoint, data);
        setNamaMenu('')
        setHarga('')
        setImage('')
        setDeskripsi('')
        setJenisId('')
        setIsMutating(false);
        router.refresh()
        setModal(false)
    }
    return (
        <div>
            <button className="btn" onClick={handleChange}>
                Add New
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Category</h3>
                    <form onSubmit={handleSubmit}>
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
                                onChange={(e) => setHarga(e.target.value)}
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
                                onChange={(e) => setJenisId(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Jenis"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">
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
}

export default AddMenu