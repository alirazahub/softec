import React from 'react'
import { Carousel as Slider } from 'antd';

function Carousel() {
    const contentStyle = {
        height: '60vh',
        width: '100%',
        background: '#364d79',
    }
    return (
        <>
            <div style={{ marginBottom: 40 }}>
                <Slider autoplay >
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
                </Slider>
            </div>
        </>
    )
}

export default Carousel