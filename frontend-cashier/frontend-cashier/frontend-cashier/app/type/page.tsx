export const metadata = {
    title: "Type",
}

import axios from 'axios'
import Link from 'next/link'
import AddType from './addType'
import DeleteType from './deleteType'
import EditType from './editType'
import React from 'react'

type Type = {
    id: number;
    nama_jenis: string;
    kategori_id: number;
}

const getType = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/type");

    return res.data.data
}

const TypeList = async () => {
    const type: Type[] = await getType();
    return (
        <div className="px-10 py-5">
            <div className="py-2">
                <AddType />
            </div>
            <div className="overflow-x-auto">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-800'>
                            <th className='w-1/6'>No.</th>
                            <th className='w-2/6'>Nama Jenis</th>
                            <th className='w-2/6'>Kategori</th>
                            <th className='w-1/6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {type.map((type, index) => (
                            <tr key={type.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{type.nama_jenis}</td>
                                <td>{type.kategori_id}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        
                                    <EditType {...type} />

                                    </div>
                                    <DeleteType {...type} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TypeList;