export const metadata = {
    title: "Product",
}

import React from 'react'
import axios from 'axios'
import Link from 'next/link'

type Product = {
    id: number;
    category_id: number;
    name: string;
    price: number;
    stock: number;
    tag: string;
    images: string;
}

const getProduct = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/product")
    return res.data.data
}

const ProductList = async () => {
    const product: Product[] = await getProduct()
    return (
        <div className='title-product'>
            <h1>Product List</h1>
            <ul className='list-disc space-y-2 space-x-12 font-poppins text-lg flex items-center mr-12'>
                {product.map((product, index) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <li className='mr-12'>{product.name}</li>
                        <li className='mr-12'>{product.category_id}</li>
                        <li className='mr-12'>{product.price}</li>
                        <li className='mr-12'>{product.stock}</li>
                        <li className='mr-12'>{product.tag}</li>
                    </Link>
                ))}
            </ul>
            <table className='w-auto'>
                <thead>
                    <tr>
                        <th className='text-md px-6 py-3'>Name</th>
                        <th>Category ID</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Tag</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((product, index) => (
                        <tr key={product.id}>
                            <td className=''><a href={`/product/${product.id}`}>{product.name}</a></td>
                            <td className=''>{product.category_id}</td>
                            <td className=''>{product.price}</td>
                            <td className=''>{product.stock}</td>
                            <td className=''>{product.tag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList
