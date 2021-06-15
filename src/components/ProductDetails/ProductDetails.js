import React from 'react'
import { useParams } from 'react-router-dom'
import fakeData from '../../fakeData'
import Product from '../Product/Product'


export default function ProductDetails() {
    const {key}= useParams()
    const product=fakeData.find(product=>product.key===key)
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    )
}
