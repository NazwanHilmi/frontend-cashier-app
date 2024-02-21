const KaryawanDetail = ({params}: {params: {karyawanId: string}}) => {
    return (
        <div>
        Karyawan {params.karyawanId[1]}
        </div>
    )
}

export default KaryawanDetail
