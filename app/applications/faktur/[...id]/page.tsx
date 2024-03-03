'use client'

import axios from 'axios'
import React, {useEffect} from 'react'
import { usePDF } from 'react-to-pdf';
import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from 'next/link';
import CetakPDF from './pdf';

type Transaksi = {
    id: number;
    tanggal: number;
    total_harga: number;
    image: string;
    note: string;
    payment: {
        id: number;
        name: string;
    }
    detail: {
        id: number;
        sub_total: number;
        unit_price: number;
        quantity: number
        menu: {
            id: number;
            nama: string;
        };
    }[];
}


const getTransaksi = async (id: number) => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transaksi/${id}`)

    return res.data.data
}

const page = async ({ params, tunai }: { params: { id: number }, tunai: number}) => {
    const transaksi: Transaksi = await getTransaksi(params.id)

    const amountPrice = (unit_price: number, quantity: number) => {
        return unit_price * quantity;
    }

    console.log(transaksi)
    return (
        <div>
            <div className="w-full flex mt-4 mb-4 justify-evenly">
        {/* <button className='btn btn-sm border-none text-white bg-red-600'>Cetak Nota</button> */}
        <Link href='/applications/transaction' className='btn btn-sm bg-blue-500 text-white border-none font-bold hover:bg-blue-700'><IoReturnUpBackSharp size={20}/></Link>
        <CetakPDF transaksi={transaksi}/>
        </div>
        <div className="max-w-lg mx-auto p-8 border border-gray-300 shadow-lg rounded-lg font-sans text-gray-700 text-base leading-6">
        <table className="w-full text-left">
        <tbody>
            <tr>
                <td colSpan={2} className='pb-12'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Coffee Shop</strong>
                                    <br />
                                    {transaksi.tanggal}
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <tr className="bg-gray-200 p-4 font-bold">
                <td>Produk</td>
                <td className='text-right'>Subtotal</td>
            </tr>

            {transaksi.detail.map((item) => (
                <tr className="total" key={item.id}>
                    <td>{item.menu.nama} <br />
                        <strong>Harga :</strong> {item.unit_price} x {item.quantity}
                    </td>
                    <td className="text-right">Rp. {amountPrice(item.unit_price, item.quantity)}</td>
                </tr>
            ))}

            <tr className='total'>
                <td></td>
                <td className='text-right'>Subtotal : Rp. {transaksi.total_harga}</td>
            </tr>
            <tr className="total">
                <td></td>
                <td className='text-right'>Pembayaran: Rp -2000 <br /></td>
            </tr>
            <tr>
                <td>
                    <strong>Detail Pembayaran</strong>
                </td>
            </tr>

            <tr>
                <td>Transfer ke: {transaksi.id}</td>
                <td></td>
            </tr>
            <tr>
                <td>Tanggal: {transaksi.tanggal}</td>
                <td></td>
            </tr>
        </tbody>
        </table>
        </div>
    </div>
    )
}

export default page
