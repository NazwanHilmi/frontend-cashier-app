export const metadata = {
    title : "Category",
}

import React from 'react'
import axios from 'axios'
import Link from 'next/link'

type Category = {
    id: number;
    nama: string;
}

const getCategory = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/category")
    return res.data.data
}

const CategoryList = async () => {
    const category : Category[] = await getCategory()
    return (
        <div>
            <h1>Category List</h1>
            <ul>
                {category.map((category, index) => (
                    <Link href={`/category/${category.id}`} key={category.id}>
                        <li>{category.nama}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList
