import React from 'react'
import { cardsData } from '../data'
import Carousel from '../components/Carousel'
import Section from '../components/Section'

function Home() {

    return (
        <>
            <Carousel />
            <Section title={"New Arrivals"} cardsData={cardsData} />
            <Section title={"Coming Soon"} cardsData={cardsData} />

        </>

    )
}

export default Home