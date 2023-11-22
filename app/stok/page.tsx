import react from 'react';
import axios from 'axios';

type Stok = {
    id: number;
    menu_id: number;
    jumlah : number;
}

const getStok = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/stok");

    return res.data.data
}


const Stok = async () => {
    const stok: Stok[] = await getStok();
    return (
        <div>

        </div>
    );
}

export default Stok;
