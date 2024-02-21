import React, { ReactElement } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { IoMdLogOut} from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { FaTableCellsLarge, FaTag, FaCartShopping } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import AyahLogo from "/public/images/white-ayahcoding.png";
import AltProfile from "/public/images/profile.png";

type MenuItem = {
    name: ReactElement | string;
    icon: ReactElement | null;
    link : string,
    isActive: boolean;
}

const menu1: MenuItem[] = [
    {
        name : <h1>Dashboard</h1>,
        icon: <MdDashboard size={18} className='text-white'/>,
        link : "/",
        isActive: false,
    },
    {
        name : <h1>Kategori</h1>,
        icon: <FaTag size={18} className='text-white'/>,
        link : "/data/category",
        isActive: false,
    },
    {
        name :<h1>Jenis</h1>,
        icon: <BiSolidFoodMenu size={18} className='text-white'/>,
        link : "/data/type",
        isActive: false,
    },
    {
        name : <h1>Menu</h1>,
        icon: <FaCartShopping size={18} className='text-white'/>,
        link : "/data/menu",
        isActive: false,
    },
    {
        name : <h1>Stok</h1>,
        icon: <AiOutlineStock size={18} className='text-white'/>,
        link : "/data/stok",
        isActive: false,
    },
    {
        name : <h1>Customer</h1>,
        icon: <FaTableCellsLarge size={18} className='text-white'/>,
        link : "/data/customer",
        isActive: false,
    },
    {
        name : <h1>List Transaksi</h1>,
        icon: <FaTableCellsLarge size={18} className='text-white'/>,
        link : "/data/listTransaksi",
        isActive: false,
    },
    {
        name : <h1>List Detail Transaksi</h1>,
        icon: <FaTableCellsLarge size={18} className='text-white'/>,
        link : "/data/listDetailTransaksi",
        isActive: false,
    },
]

const menu2: MenuItem[] = [
    {
        name : <h1>Transaksi</h1>,
        icon: <FaShoppingBag size={18} className='text-white'/>,
        link : "/applications/transaction",
        isActive: false,
    },
    {
        name : <h1>Karyawan</h1>,
        icon: <BsFillPeopleFill size={18} className='text-white'/>,
        link : "/data/karyawan",
        isActive: false,
    }
]
const menu3: MenuItem[] = [
    {
        name : <h1>Logout</h1>,
        icon: <IoMdLogOut   size={18} className='text-white'/>,
        link : "/data/logout",
        isActive: false,
    },
]

const MainHeader = () => {
    
    return (
        <div className='shadow-lg'>
            <section className="sticky-sidebar w-20 md:w-64 bg-blue-dark h-screen shadow-black shadow">
                <div className="p-2 pl-5 pb-0 flex justify-start items-center">
                <Image src={AyahLogo} alt="Logo Ayah Coding" width={100} height={100} className='mr-2 sm:w-10 sm:h-10'/>
                    <span className='hidden sm:block'>
                        <h1 className='font-rubik text-xl text-white'>Coffee Shop</h1>
                    </span>
                    <span className='sm:hidden'>
                        <h1 className='font-rubik text-xl'>CS</h1>
                    </span>
                </div>
                
                <div className="p-5 pb-2 text-sm">
                    <Menus menu={menu1} title="LIST"/>
                </div>
                <div className="p-5 pt-2 pb-2 text-sm">
                    <Menus menu={menu2} title="APPLICATION"/>
                </div>
                {/* <div className="p-5 text-sm">
                    <Menus menu={menu3} title="AUTH"/>
                </div> */}
                {/* <div className='flex mx-5 mt-10 bg-blue-300 bg-opacity-10 border border-blue-100 rounded-md p-2 items-center'>
                    <Image src={AltProfile} alt='profile' width={30} height={30} className='object-cover w-10 h-10 rounded-full' />
                    <div className='flex-1 ml-3 items-center text-white'>
                        <div className='text-sm'>Nazwan Hilmi</div>
                        <div className='text-xs'>Admin</div>
                    </div>
                    <CiSettings size={18} className='text-white'/>
                </div> */}
            </section>
        </div>
    )
}

const Menus: React.FC<{menu : MenuItem[], title : string}> = ({ menu, title}) => {
    return (
        <div>
            <h6 className='mb-2 text-xs sm:text-sm text-white'>{title}</h6>
        <ul>
            {menu.map((item, index) => {
                const menuActive = item.isActive?"bg-opacity-10 flex px-3 border border-blue-100 py-2 rounded-md text-blue-400 border-none items-center" : "px-3 py-2 flex items-center";
                const textActive = item.isActive?"text-blue-500":"text-white hover:text-blue-300"
                return (
                    <Link key={index} href={item.link} className={`${menuActive} hover:bg-blue-300 hover:bg-opacity-10 hover:rounded-md`}>
                        <li className={`cursor-pointer flex`}>
                            {item.icon}
                            <div className={`ml-2 ${textActive} hidden sm:block`} key={index}>
                            {item.name}
                            </div>
                        </li>
                    </Link>
                )
            })}
        </ul>
    </div>
    );
};


export default MainHeader
