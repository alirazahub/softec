import React from 'react'
import ItemCard from '../components/ItemCard'
import SectionHeader from '../components/SectionHeader'

function Section({ title, Data }) {
    return (
        <>
            <SectionHeader title={title} />
            <div className='d-flex flex-wrap'>
                {Data.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>
        </>
    )
}

export default Section