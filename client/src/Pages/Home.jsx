import React, { useState, useEffect } from 'react'
import { cardsData } from '../data'
import Carousel from '../components/Carousel'
import Section from '../components/Section'
import axios from 'axios'
import { url } from '../key'
import { Cookies } from 'react-cookie'

function Home() {
    const [cardsData, setCardsData] = useState([])
    const [cookies, setCookie] = useState('customerToken')
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