export const metadata = {
    title: "Kategori",
}
import axios from 'axios'
import React from 'react';
import AddCategory from './addCategory';
import DeleteCategory from './deleteCategory';
import EditCategory from './editCategory';

type Category = {
    id: number;
    nama: string;
}


const getCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);

    return res.data.data
}

const CategoryList = async () => {
    const category: Category[] = await getCategory();
    return (
        <div>
            <header className='w-full p-4 bg-white shadow-lg'>
                <h1 className="text-lg font-montserrat font-semibold">{metadata.title}</h1>
            </header>
            <div className="px-10 py-5">
                <div className="py-2">
                    <AddCategory />
                </div>
            <div className="overflow-x-auto rounded-md">
                <table className='table'>
                    <thead>
                        <tr className='text-white bg-gray-700'>
                            <th className='text-xs'>No.</th>
                            <th className='text-xs'>Nama Kategori</th>
                            <th className='text-xs text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((category, index) => (
                            <tr key={category.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td>{index + 1}</td>
                                <td>{category.nama}</td>
                                <td className='flex items-center justify-center gap-2'>
                                    <EditCategory {...category} />
                                    <DeleteCategory {...category} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default CategoryList;
