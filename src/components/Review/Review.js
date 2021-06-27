import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import success from '../../images/success.png';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';



export default function Review() {

    document.title="Review"
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const removeFromCartBtn=(key)=>{
        const newCart=cart.filter(pd=>pd.key!==key)
        setCart(newCart);
        removeFromDatabaseCart(key)
    }

     const history=useHistory()

    const handleProceedOrder=()=>{
        history.push('/shipment')
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

        // const cartProducts=productKeys.map(key=>{
        //     const product=fakeData.find(product=>product.key===key)
        //     product.quantity=savedCart[key]
        //     return product;
        // });
        // setCart(cartProducts);
    },[])


    
    return (
        <div className="reviewContainer">
            <div className="productContainer">
                {
                    cart.map(product=><ReviewItem removeFromCartBtn={removeFromCartBtn} product={product}></ReviewItem>)
                }
                {orderPlaced? <img src={success} alt="icon" />: <h1>Please add something into your cart first</h1> }
            </div>
            <div className="cartContainer">
                <Cart cart={cart}><button onClick={handleProceedOrder} className="placeOrder">Proceed Order</button></Cart>
            </div>
            
        </div>
    )
}
