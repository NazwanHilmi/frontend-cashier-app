import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = ({ status, message, isTransaksi, id, resetState }: {status: number | boolean, message: string, isTransaksi: boolean, id?: number, resetState: () => void}) => {
    const router = useRouter()
useEffect(() => {
    Swal.fire({
        html: status === 200 ? `<strong>${message}</strong>` : `<strong>${message}</strong>`,
        icon: status === 200 ? 'success' : 'error',
        showDenyButton: true,
        showConfirmButton: isTransaksi,
        denyButtonText: 'OK',
        confirmButtonText: isTransaksi ? 'Cetak Faktur' : undefined
        }).then((result) => { 
            if (result.isConfirmed && resetState) {
                resetState()
            }else {
                router.refresh();
            }
        });
    }, [status]);

    return null;
};

export default SweetAlert;
