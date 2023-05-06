import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


export default function Navbar() {

    const [search, setSearch] = useState('');



    return (
        <div class="wrapperImp">
            <nav className='customnav'>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
                <div class="content">
                    <div class="logo" ><a href="#" style={{ textDecoration: 'none' }}>Gaming Titans</a></div>
                    <ul class="links">
                        <li><a href="#" style={{ textDecoration: 'none' }}>Home</a></li>
                        <li>
                            <a href="#" class="desktop-link" style={{ textDecoration: 'none' }}>Features</a>
                            <input type="checkbox" id="show-features" />
                            <label for="show-features">Features</label>
                            <ul>
                                <li><a href="#" style={{ textDecoration: 'none' }}>Drop Menu 1</a></li>
                                <li><a href="#" style={{ textDecoration: 'none' }}>Drop Menu 2</a></li>
                                <li><a href="#" style={{ textDecoration: 'none' }}>Drop Menu 3</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <button type="button" class="btn btn-danger fw-bold">Sign In</button>
                {/* <span className="text-white">
                    0 <FaShoppingCart className='fs-5 text-danger' />
                </span> */}
            </nav>
        </div>
    )
}