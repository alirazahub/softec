import React from 'react'
import ItemCard from '../components/ItemCard'
import { cardsData } from '../data'
import SectionHeader from '../components/SectionHeader'
import { Carousel } from 'antd';

function Home() {
    const contentStyle = {
        height: '60vh',
        width: '100%',
        background: '#364d79',
    }
    return (
        <>
            <div style={{ marginBottom: 40 }}>
                <Carousel autoplay >
                    <div>
                        <img src="https://cdn.geekay.com/media/wysiwyg/pc-upload/Redfall_Website-Banner_960x430_AVAILABLE.jpg" style={contentStyle} alt="pic" />
                    </div>
                    <div>
                        <img src="https://cdn.geekay.com/media/wysiwyg/pc-upload/HWL_Web-Banner_960x430_MCY.jpg" style={contentStyle} alt="pic" />
                    </div>
                    <div>
                        <img src="https://cdn.geekay.com/media/wysiwyg/pc-upload/960x430_Zelda_keypouch_1.jpg" style={contentStyle} alt="pic" />
                    </div>
                    <div>
                        <img src="https://cdn.geekay.com/media/wysiwyg/pc-upload/202305_Starwars_May4_Banner.jpg" style={contentStyle} alt="pic" />
                    </div>
                </Carousel>
            </div>

            <SectionHeader title='New Arrivals' />
            <div className='d-flex flex-wrap'>
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
                {cardsData.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>

        </>

    )
}

export default Home