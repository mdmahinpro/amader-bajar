import React from 'react';
import './ReviewItem.css';
export default function ReviewItem(props) {
    const {name,quantity,key,price}= props.product;
    const removeFromCartBtn=props.removeFromCartBtn;
    return (
        <div className="review-item">
            <h2>{name}</h2>
            <h5>Quantity:{quantity}</h5>
            <h5>Price: {price}</h5>
            <button onClick={()=>removeFromCartBtn(key)} className="removeBtn">Remove</button>
        </div>
    )
}
