const PelangganDetail = ({params}: {params: {pelangganId: string}}) => {
    return (
        <div>
        Pelanggan {params.pelangganId[1]}
        </div>
    )
}

export default PelangganDetail
