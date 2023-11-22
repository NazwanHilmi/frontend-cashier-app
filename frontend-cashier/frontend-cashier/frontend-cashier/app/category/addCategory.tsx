"use client"
import React, { SyntheticEvent, use } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


const API_URL = 'http://127.0.0.1:8000/api'
const AddCategory = () => {
    const [modal, setModal] = useState(false)
    const [nama, setNama] = useState("")
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()
    const handleChange = () => setModal(!modal)
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
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Name Category"
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

export default AddCategory