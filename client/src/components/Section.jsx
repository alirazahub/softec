import React from 'react'
import ItemCard from '../components/ItemCard'
import SectionHeader from '../components/SectionHeader'

function Section({ title, cardsData }) {
    return (
        <>
            <SectionHeader title={title} />
            <div className='d-flex flex-wrap'>
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>
        </>
    )
}

export default Section