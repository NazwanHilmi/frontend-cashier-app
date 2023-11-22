export const metadata = {
    title: "Meja",
}
import axios from 'axios'
import AddMeja from './addMeja'
import DeleteMeja from './deleteMeja'
import EditMeja from './editMeja'

type Meja = {
    id: number;
    nomor_meja: number;
    kapasitas: number;
    status: string;
}

const getMeja = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/meja");

    return res.data.data
}

const MejaList = async () => {
    const meja: Meja[] = await getMeja();
    return (
        <div className="px-10 py-5">
            <div className="py-2">
                <AddMeja />
            </div>
            <div className="overflow-x-auto">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-800'>
                            <th className='w-1/6'>No.</th>
                            <th className='w-2/6'>Nomor Meja</th>
                            <th className='w-2/6'>Kapasitas</th>
                            <th className='w-2/6'>Status</th>
                            <th className='w-1/6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meja.map((meja, index) => (
                            <tr key={meja.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{meja.nomor_meja}</td>
                                <td>{meja.kapasitas}</td>
                                <td>{meja.status}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <EditMeja {...meja} />
                                    </div>
                                    <DeleteMeja {...meja} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MejaList;
