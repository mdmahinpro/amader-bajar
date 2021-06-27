import React from 'react';
import './Cart.css';

export default function Cart(props) {
    const cart=props.cart;
    let shipping=0;
    const totalPrice=cart.reduce((total,product)=>total+product.price*product.quantity,0)
    
    if(totalPrice>30){
        shipping=12.99;
    }
    const grandTotal=(totalPrice+shipping).toFixed(2)
    

    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Items Ordered:{cart.length}</h3>
            <h4>Shipping : {shipping}</h4>
            <h3>Total: {grandTotal}</h3>
            {props.children}
        </div>
    )
}
