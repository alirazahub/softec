import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import './productDetail.css'


import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { AiFillStar } from "react-icons/ai";

function calculateAverageRating(reviews) {
    let totalRating = 0;
    for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
    }
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(2);
}

export default function ProductDetails(props) {
    const card = props.card
    return (
        <>
            <Navbar />
            <div className='procductContainer'>
                <div className="productImage"><img className='productImage' src={card.img} alt="" />
                </div>
                <div className="productInfo">
                    <h1 className='product_title'>{card.title}</h1>
                    <p className='product_desc'>{card.description}</p>
                    <h2 className='product_price'>Price: {card.price}</h2>
                    <div className="btn_div">
                        <Button type="primary" size={"default"} danger>
                            Buy Now!
                        </Button>
                        <Button type="primary" >
                            Add to Cart
                        </Button>
                    </div>
                    <div className="rating">
                        <AiFillStar color='yellow' />
                        <AiFillStar color='yellow' />
                        <AiFillStar color='yellow' />
                        <p>3</p>
                    </div>
                </div>
            </div>
            <h1 style={{ textAlign: 'center' }}>Reviews</h1>
            <div className="reviewsComment">
                <div className="reviewsComment_reviews">
                    {card.reviews.map((review) => {
                        return (
                            <div className="review">
                                <h3>{review.userID} says:</h3>
                                <p>{review.review}</p>

                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
