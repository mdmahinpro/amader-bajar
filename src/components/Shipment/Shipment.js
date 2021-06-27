import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import './Shipment.css';
export default function Shipment() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    const savedCart = getDatabaseCart;
      const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

      fetch('http://localhost:3001/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          alert('your order placed successfully');
        }
      })

    };

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
 
      <input name="name" defaultValue={loggedInUser.name} {...register("exampleRequired", { required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} {...register("exampleRequired", { required: true })} placeholder="Your Email"  />
      {errors.email && <span className="error">Email is required</span>}
      <input name="address" {...register("exampleRequired", { required: true })} placeholder="Your Address"  />
      {errors.address && <span className="error">Address is required</span>}
      <input name="phone" {...register("exampleRequired", { required: true })} placeholder="Your Phone"  />
      {errors.phone && <span className="error">Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
}
