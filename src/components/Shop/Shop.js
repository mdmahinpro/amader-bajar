import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loading from '../../images/loading.gif';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

document.title="Shop"

export default function Shop() {

    useEffect(()=>{
        fetch('http://localhost:3001/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
   
    //Product State
    const [products, setProducts] = useState([])

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
        fetch("http://localhost:3001/productByKeys",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])


    return (
        // Load all Product Data
        <div className="shop-container"> 
            <div className="product-container">
                {
                    products.length==0 && <img src={loading} alt="" />
                }
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
