const ProductDetail = ({params}: {params: {productId: string}}) => {
    return (
        <div>
        Category {params.productId[1]}
        </div>
    )
}

export default ProductDetail

