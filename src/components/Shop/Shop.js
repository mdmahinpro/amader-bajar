import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


export default function Shop() {
   
    //Product State
    const first10=fakeData.slice(0,10)
    const [products, setProducts] = useState(first10)

    //Cart State
    const [cart, setCart] = useState([])
    
    //Add Product Into Cart Handler
    const handleAddProduct=(product)=>{
        const addedProductKey=product.key;    //kind of destructuring
        const similarProduct=cart.find(pd=>pd.key===addedProductKey) //Finding if product is already in array
        let count=1;
        let newCart;
        if(similarProduct){  //If product is already in array
            count=similarProduct.quantity+1;
            similarProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==addedProductKey)
            newCart=[...others,similarProduct]
        }
        else{  //If product is not already in the array
            product.quantity=1;
            newCart=[...cart,product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count)
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart()
        const productKeys=Object.keys(savedCart);
        const previousCart=productKeys.map(pdKey=>{
            const product=fakeData.find(pd=>pd.key===pdKey)
            product.quantity=savedCart[pdKey]
            return product;
        })
        setCart(previousCart)
    })


    return (
        // Load all Product Data
        <div className="shop-container"> 
            <div className="product-container">
                {
                    products.map(product=> <Product showAddToCart={true} key={product.key} product={product} handleAddProduct={handleAddProduct}></Product> )
                }    
            </div>
            <div className="cart-container">
                <Cart cart={cart}><Link to="/review"><button className="reviewOrder">Review Order</button></Link>
</Cart>
            </div>
            
        </div>
    )
}
