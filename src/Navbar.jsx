import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [active, setActive] = useState(false)
    return (
        <>
            <nav className='navbar'>
                <h1>Musify</h1>
                <Link to='/'>Home</Link>
                <Link to='/songs'>Songs</Link>
            </nav>
        </>
    )
}

export default Navbar