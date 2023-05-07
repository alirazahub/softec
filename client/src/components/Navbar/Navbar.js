import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaShoppingCart } from 'react-icons/fa';


export default function Navbar() {

    const [search, setSearch] = useState('');
    const [signRet, setSign] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { name: 'Home', to: '/' },
    ];

    const dropdownLinks = [
        { name: 'Games', to: '/' },
        { name: 'Gaming Items', to: '/' },
    ];

    useEffect(() => {
        const signRet = () => {
            if (location.pathname === '/login') {
                setSign("d-none")
            }
        }
        signRet()
    }, [location]);


    return (
        <div class="wrapperImp">
            <nav className='customnav'>
                <input type="checkbox" id="show-search" />
                <input type="checkbox" id="show-menu" />
                <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
                <div class="content">
                    <div class="logo" ><a href="#" style={{ textDecoration: 'none' }}>Gaming Titans</a></div>
                    <ul class="links">
                        {
                            links.map((link) => (
                                <li> <Link to={link.to} style={{ textDecoration: 'none' }}>{link.name}</Link></li>
                            ))
                        }
                        <li>
                            <a href="#" class="desktop-link" style={{ textDecoration: 'none' }}>Features</a>
                            <input type="checkbox" id="show-features" />
                            <label for="show-features">Features</label>
                            <ul>
                                {
                                    dropdownLinks.map((link) => (
                                        <li> <Link to={link.to} style={{ textDecoration: 'none' }}>{link.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
                {<Link to={"/login"} class={`btn btn-danger fw-bold ${signRet}`}><FaShoppingCart/></Link>}
                
            </nav>
        </div>
    )
}