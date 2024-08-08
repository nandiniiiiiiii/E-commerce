import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/productList/ProductList'

function Home() {
    return (
        <>
            <NavBar>
                <ProductList/>
            </NavBar>
        </>
    )
}

export default Home
