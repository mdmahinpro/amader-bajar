import React from 'react'

export default function Inventory() {
    const product={}
    const handleAddProduct=()=>{
        fetch("http://localhost:3001/addProduct",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text" name=""/></p>
                <p><span>Price:</span><input type="text" name=""/></p>
                <p><span>Quantity:</span><input type="text" name=""/></p>
                <p><span>Product Image:</span><input type="file" name="" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    )
}
