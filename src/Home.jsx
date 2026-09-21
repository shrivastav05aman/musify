import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <h1>Welcome to Musify</h1>
            <p>Your ultimate music streaming experience!</p>
            <Link to='/songs' className='btn'>Dive In World of Songs</Link>
        </div>
    )
}

export default Home