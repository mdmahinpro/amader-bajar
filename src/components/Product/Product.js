import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

export default function Product(props) {
    const {name,img,price,seller,stock,key}=props.product;
    const handleAddProduct=props.handleAddProduct;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt="" />
            </div>
            <div className="details">
                <Link to={`/product/${key}`}>{name}</Link>
                <h4>Seller: {seller}</h4>
                <h2>Price: {price}$</h2>
                <h4>In Stock : {stock}</h4>
                {props.showAddToCart?<button  onClick={()=>handleAddProduct(props.product)} className="addToCartBtn"><FontAwesomeIcon icon={faCartPlus} /> Add to Cart</button>:""}
            </div>
        </div>
    )
}
