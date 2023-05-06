import React from 'react'
import ItemCard from '../components/ItemCard'
import { cardsData } from '../data'

function Home() {
    return (
        <div className='container'>
            <div className='d-flex flex-wrap'>
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>
        </div>

    )
}

export default Home