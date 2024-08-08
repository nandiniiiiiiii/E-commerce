import React from 'react'
import ProductDetails from '../features/productList/ProductDetails'
import NavBar from '../features/navbar/NavBar'

function ProductDetailPage() {
    return (
        <>
            <NavBar>
                <ProductDetails />
            </NavBar>
        </>
    )
}

export default ProductDetailPage
