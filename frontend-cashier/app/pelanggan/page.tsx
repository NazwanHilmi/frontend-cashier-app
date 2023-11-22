export const metadata = {
    title: "Pelanggan",
}
import axios from 'axios'
import Link from 'next/link'
import AddPelanggan from './addPelanggan'
import DeletePelanggan from './deletePelanggan'
import EditPelanggan from './editPelanggan'

type Pelanggan = {
    id: number;
    nama: string;
    email: string;
    nomor_telepon: string;
    alamat: string;
}

const getPelanggan = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/pelanggan");

    return res.data.data
}

const PelangganList = async () => {
    const pelanggan: Pelanggan[] = await getPelanggan();
    return (
        <div className="px-10 py-5">
            <div className="py-2">
                <AddPelanggan />
            </div>
            <div className="overflow-x-auto">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-800'>
                            <th className='w-1/6'>No.</th>
                            <th className='w-1/6'>Nama</th>
                            <th className='w-1/6'>Email</th>
                            <th className='w-1/6'>Nomor Telepon</th>
                            <th className='w-1/6'>Alamat</th>
                            <th className='w-2/6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pelanggan.map((pelanggan, index) => (
                            <tr key={pelanggan.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{pelanggan.nama}</td>
                                <td>{pelanggan.email}</td>
                                <td>{pelanggan.nomor_telepon}</td>
                                <td>{pelanggan.alamat}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <EditPelanggan {...pelanggan} />
                                    </div>
                                    <DeletePelanggan {...pelanggan} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PelangganList;
