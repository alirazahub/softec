import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { cardsData } from '../../data'
import './cart.css'

import {Button} from 'antd'

import { FaTimes } from 'react-icons/fa'

const addElipse = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '....' : str;
}

export default function Cart() {
    // state to keep track of the quantity entered by the user for each item
    const [quantities, setQuantities] = useState({});

    // state to keep track of the total price of all items
    const [total, setTotal] = useState(0);

    // function to handle changes in the quantity input field for a particular item
    const handleQuantityChange = (event, itemId) => {
        setQuantities({ ...quantities, [itemId]: event.target.value });
    }

    // function to calculate the total price of a particular item based on the quantity entered
    const calculateItemTotalPrice = (price, quantity) => {
        return (price * quantity).toFixed(2);
    }

    // function to calculate the total price of all items
    const calculateTotalPrice = () => {
        let sum = 0;
        for (let i = 0; i < cardsData.length; i++) {
            const itemId = cardsData[i].id;
            const quantity = quantities[itemId] || 1;
            sum += parseFloat(calculateItemTotalPrice(cardsData[i].price, quantity));
        }
        return sum.toFixed(2);
    }

    // update the total price whenever the quantities change
    useEffect(() => {
        setTotal(calculateTotalPrice());
    }, [quantities])

    return (
        <>
            <Navbar />
            <div className="cart">
                <h1 className="cartheading">Your Bag</h1>
                <hr />
                <div className="cartDetails">
                    <div className="cartItems">
                        {cardsData.map((item) =>
                            <>
                                <div className='cartItem' key={item.id}>
                                    <img src={item.img} alt="" className='itemImg' />
                                    <div className="itemDetails">
                                        <h3 className='itemName'>{item.title}</h3>
                                        <p style={{ marginTop: -10 }}>{addElipse(item.description, 50)}</p>
                                        <strong className='itemPrice'>Base price: {item.price}</strong>
                                        <div>
                                            <label htmlFor={`quantityInput-${item.id}`} style={{ marginRight: 20 }}>Quantity:  </label>
                                            <input style={{ paddingLeft: 10 }} type="number" id={`quantityInput-${item.id}`} name={`quantityInput-${item.id}`} min="1" value={quantities[item.id] || 1} onChange={(event) => handleQuantityChange(event, item.id)} />
                                            <br /><strong className='itemTotalPrice'>Total cost: {calculateItemTotalPrice(item.price, quantities[item.id] || 1)}</strong>
                                        </div>
                                    </div>
                                    <button className='cancelBtn'><FaTimes /></button>
                                </div>
                                <hr />
                            </>
                        )}
                    </div>
                    <div className="cartAmount">
                        <p>Total amount: <strong>{total}</strong></p>
                        <Button type="primary">Place Order</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
