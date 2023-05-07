import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { FaHeart } from 'react-icons/fa';

const { Meta } = Card;

function ItemCard({ item }) {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        console.log(item);
    }, []);

    return (
        <div className="m-2">
            <Card
                hoverable
                style={{
                    width: 240,
                    height:460
                }}
                cover={<img alt="example" style={{height:300}} src={item.image} />}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Meta title={item.title} />
                <div className="fs-6 fw-bold my-2">{item.sellingPrice} PKR</div>
                {hovered && (
                    <div className="d-flex justify-content-between" style={{zIndex:9999,position:"absolute",marginTop:30}}>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm my-2"
                        >
                            Add to Cart
                        </button>

                        <div style={{marginLeft:70}}>
                            <FaHeart className="text-danger fs-5 mt-3" />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default ItemCard;
