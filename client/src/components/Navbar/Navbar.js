import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';


export default function Navbar() {

    const [search, setSearch] = useState('');



    return (
        <div class="wrapperImp">
            <nav className='customnav'> 
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
                <div class="content">
                    <div class="logo" ><a href="#" style={{textDecoration:'none'}}>Gaming Titans</a></div>
                    <ul class="links">
                        <li><a href="#" style={{textDecoration:'none'}}>Home</a></li>
                        <li><a href="#" style={{textDecoration:'none'}}>About</a></li>
                        <li>
                            <a href="#" class="desktop-link" style={{textDecoration:'none'}}>Features</a>
                            <input type="checkbox" id="show-features" />
                            <label for="show-features">Features</label>
                            <ul>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 1</a></li>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 2</a></li>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 3</a></li>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 4</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="desktop-link " style={{textDecoration:'none'}}>Services</a>
                            <input type="checkbox" id="show-services" />
                            <label for="show-services">Services</label>
                            <ul>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 1</a></li>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 2</a></li>
                                <li><a href="#" style={{textDecoration:'none'}}>Drop Menu 3</a></li>
                            </ul>
                        </li>
                        <li><a href="#" style={{textDecoration:'none'}}>Feedback</a></li>
                    </ul>
                </div>
                <label for="show-search" class="search-icon"><i class="fas fa-search"></i></label>
                <form action="#" class="search-box">
                    <input type="text" placeholder="Type Something to Search..." required />
                    <button type="submit" class="go-icon"><i class="fas fa-long-arrow-alt-right"></i></button>
                </form>
            </nav>
        </div>
    )
}