export const metadata = {
    title: "Category",
}
import axios from 'axios'
import Link from 'next/link'
import AddMenu from './addMenu'
import DeleteMenu from './deleteMenu'
import EditMenu from './editMenu'
import Stok from '../stok/page'

type Menu = {
    id: number;
    nama_menu: string;
    harga: number;
    image: string;
    deskripsi: string;
    jenis_id: number
}


const getMenu = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/menu");

    return res.data.data
}


const MenuList = async () => {
    <Stok />
    const menu: Menu[] = await getMenu();
    return (
        <div className="px-10 py-5">
            <div className="py-2">
                <AddMenu />
            </div>
            <div className="overflow-x-auto">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-800'>
                            <th className='w-1/6'>No.</th>
                            <th className='w-1/6'>Nama Menu</th>
                            <th className='w-1/6'>Harga</th>
                            <th className='w-1/6'>Image</th>
                            <th className='w-1/6'>Deskripsi</th>
                            <th className='w-1/6'>Jenis</th>
                            <th className='w-1/6'>Stok</th>
                            <th className='w-2/6'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((menu, index) => (
                            <tr key={menu.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{menu.nama_menu}</td>
                                <td>{menu.harga}</td>
                                <td>{menu.image}</td>
                                <td>{menu.deskripsi}</td>
                                <td>{menu.jenis_id}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <EditMenu {...menu} />
                                    </div>
                                        <DeleteMenu {...menu} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuList;
