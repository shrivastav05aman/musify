import React, { useContext, useState } from 'react'
import { data, Link, Outlet, useLocation, useParams } from 'react-router-dom'


const SongPlayer = () => {
    const { id } = useParams()
    return (
        <div className='song-player'>
            {id ? (
                <iframe
                    title="Spotify Player"
                    src={`https://open.spotify.com/embed/track/${id}`}
                    width="75%"
                    height="44%"
                    frameBorder="0"
                    allow="encrypted-media; autoplay; clipboard-write"
                    style={{ borderRadius: 8, }}
                />
            ) : (
                <p>Select a song to play.</p>
            )}
            <Link className='back' to='/songs'>Back</Link>

            <Outlet />
        </div>
    )
}

export default SongPlayer