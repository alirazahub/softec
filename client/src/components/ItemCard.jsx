import React, { useState } from 'react';
import { Card } from 'antd';
import { FaHeart } from 'react-icons/fa';

const { Meta } = Card;

function ItemCard({ item }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="m-2">
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={item.img} />}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Meta title={item.title} />
                <div className="fs-6 fw-bold my-2">{item.price} PKR</div>
                {hovered && (
                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm my-2"
                        >
                            Add to Cart
                        </button>

                        <div >
                            <FaHeart className="text-danger fs-5 mt-3" />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ItemCard;
