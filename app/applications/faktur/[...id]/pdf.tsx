'use client'

import { usePDF } from 'react-to-pdf';

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

type Props = {
    transaksi: Transaksi;
}

const CetakPDF = ({transaksi}: Props) => {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
        return (
        <div>
            <button className='btn btn-sm border-none text-white bg-red-600 hover:bg-red-700' onClick={() => toPDF()}>Cetak Nota</button>
            <div ref={targetRef}>
                
            </div>
        </div>
    )
}

export default CetakPDF;