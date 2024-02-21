"use client"
import { SyntheticEvent, useState, ChangeEvent} from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    deskripsi: string;
    type: {
        id: number,
        nama: string
    }
    stok: {
        id: number,
        jumlah: number
    }
}

type Type = {
    id: number;
    nama_jenis: string;
}

const API_URL = (`${process.env.NEXT_PUBLIC_API_URL}`)
    const EditMenu = ({menu, type} : {menu: Menu, type: Type[]}) => {
    const [modal, setModal] = useState(false);
    const [namaMenu, setNamaMenu] = useState(menu.nama_menu);
    const [harga, setHarga] = useState(menu.harga)
    const [image, setImage] = useState(null as File | null)
    const [deskripsi, setDeskripsi] = useState(menu.deskripsi)
    const [typeId, setTypeId] = useState(menu.type.id)
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleChange = () => {
        setModal(!modal);
        setNamaMenu(menu.nama_menu);
        setHarga(menu.harga);
        setImage(null as File | null)
        setDeskripsi(menu.deskripsi);
        setTypeId(menu.type.id);
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value: any = e.target;
        if (value) {
            setImage(value.files[0])
        }
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setIsMutating(true);

        let endpoint = `${API_URL}/menu/${menu.id}`;
        const formData = new FormData();
            formData.append('_method', 'PUT')
            formData.append('nama_menu', namaMenu);
            formData.append('harga', harga.toString());
            formData.append('deskripsi', deskripsi);
            formData.append('type_id', typeId.toString());
            if (image){
                formData.append('image', image);
            }
        
        try {
            await axios.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });

            setNamaMenu(menu.nama_menu)
            setHarga(menu.harga)
            setImage(null as File | null)
            setDeskripsi(deskripsi)
            setTypeId(menu.type.id)
            setModal(false)
            setIsMutating(false);

            router.refresh()
        } catch (error : any) {
            setIsMutating(false);

            router.refresh()
        }
    
    };

    return (
        <div>
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
                    <h3 className="font-bold text-lg text-slate-800">Add New Menu</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={namaMenu}
                                onChange={(e) => setNamaMenu(e.target.value)}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Menu Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Harga</label>
                            <input
                                type="number"
                                value={harga}
                                onChange={(e) => setHarga(parseInt(e.target.value))}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                placeholder="Harga"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleChangeImage} 
                                className="bg-white border-slate-300"
                                />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Deskripsi</label>
                            <textarea 
                                value={deskripsi}
                                className="input w-full input-bordered bg-white text-slate-800 border-slate-300"
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Deskripsi">
                            </textarea>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jenis</label>
                            <select className="select select-bordered w-full bg-white text-slate-800 border-slate-300 " onChange={(e) => setTypeId(parseInt(e.target.value))} defaultValue={menu.type.id}>
                                <option>Pilih Type</option>
                                {type.map((item, index) => (
                                    <option
                                        value={item.id}
                                        key={index}>{item.nama_jenis}</option>
                                ))}
                            </select>
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

export default EditMenu