import React from 'react'
import "../Hero/Hero.scss"
import SearchBox from '../SearchBox/SearchBox'

function Hero() {
    return (
        <div className='hero-container'>
            <div className='hero-img'>
                <img src='https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'></img>
            </div>
            <div className='hero-slogan'>
                <h1>ADVENTURE AWAITS</h1>
                <p>What are you looking for?</p>
            </div>
            
        </div>
    )
}

export default Hero