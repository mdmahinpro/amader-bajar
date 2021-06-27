import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'



export default function ProductDetails() {
    const {key}= useParams()
    const [product, setProduct] = useState({})

    useEffect(()=>{
        fetch("http://localhost:3001/product/"+key)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[key])

    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    )
}
