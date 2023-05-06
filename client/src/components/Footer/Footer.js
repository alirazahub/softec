import React from 'react'
import './footer.css'

import { FiInstagram } from "react-icons/fi";
import { AiOutlineLinkedin } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className='customFooter'>
            <div class="content">
                <div class="left box">
                    <div class="upper">
                        <div class="topic">About us</div>
                        <p>
                            Gaming Titan is an online platform that offers a wide range of gaming products and services directly to consumers. With its user-friendly interface and extensive selection of games, Gaming Titan is a one-stop-shop for all gaming enthusiasts. Whether you're looking for the latest video game release or in-game items to enhance your gameplay, Gaming Titan has you covered.</p>
                    </div>
                    <div class="lower">
                        <div class="topic">Contact us</div>
                        <div class="email">
                            <a href={"mailto:abdulhadi.reality@gmail.com"}><i class="fas fa-envelope"></i>abdulhadi.reality@gmail.com</a><br />
                            <a href={"mailto:alirazahub2@gmail.com"}><i class="fas fa-envelope"></i>alirazahub2@gmail.com</a><br />
                            <a href={"mailto:zainansarp41@gmail.com"}><i class="fas fa-envelope"></i>zainansarp41@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div class="middle box">
                    <div class="topic">Our Services</div>
                    <div><a href=''>Gaming merchandise</a></div>
                    <div><a  href=''>Gaming hardware</a></div>
                    <div><a href=''>Game keys</a></div>
                    <div><a href=''> In-game items</a></div>
                </div>
                <div class="right box">
                    <div class="topic">Subscribe us</div>
                    <form action="#">
                        <div class="media-icons">
                            <a href="#">< FiInstagram size={20}/></a>
                            <a href=""><AiOutlineLinkedin size={20} /></a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="bottom">
                <p>Copyright © 2023 <a href=""><strong>Tech Titans</strong></a> All rights reserved</p>
            </div>
        </footer>
    )
}
