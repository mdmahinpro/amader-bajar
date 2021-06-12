import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


export default function Shop() {
   
    const first10=fakeData.slice(0,10)
    const [products, setProducts] = useState(first10)
    console.log(first10);

    //Add Product Handler
    const handleAddProduct=(product)=>{
        const newCart=[...cart,product]
        setCart(newCart)
    }


    //Cart State
    const [cart, setCart] = useState([])

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product=> <Product product={product} handleAddProduct={handleAddProduct}></Product> )
                }    
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    )
}
