import React from 'react'
import Cart from '../features/cart/Cart'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/productList/ProductList'


function CartPage() {
    return (
        <div>
            <NavBar>
                <ProductList />
                <Cart />
            </NavBar>
        </div>
    )
}

export default CartPage
