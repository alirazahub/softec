import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Section from '../components/Section'
import axios from 'axios'
import { url } from '../key'

function Home() {
    const [cardsData, setCardsData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${url}/api/product/getAllProductsAndRatings`)
            setCardsData(res.data)
        }
        fetchData();
    }, [cardsData])


    return (
        <>
            <Carousel />
            <Section title={"New Arrivals"} Data={cardsData} />
            <Section title={"Coming Soon"} Data={cardsData} />

        </>

    )
}

export default Home