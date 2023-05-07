import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Section from '../components/Section'
import axios from 'axios'
import { url } from '../key'
import { cardsData } from '../data'

function Home() {
    


    return (
        <>
            <Carousel />
            <Section title={"New Arrivals"} Data={cardsData} />
            <Section title={"Coming Soon"} Data={cardsData} />

        </>

    )
}

export default Home