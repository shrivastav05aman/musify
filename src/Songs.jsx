import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from './Login'
import SongsContainer from './SongsContainer'

const Songs = () => {
    const accessToken = sessionStorage.getItem('spotify_access_token')
    const searchInputRef = useRef(null)
    const searchFilterRef = useRef(null)
    const [songsData, setSongsData] = useState([])


    const getData = async () => {
        searchInputRef.current.value.split(' ').join('+')
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${searchInputRef.current?.value}&type=${searchFilterRef.current?.value}&limit=10`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const data = await response.json();

        switch (searchFilterRef.current?.value) {
            case 'track':
                const tracks = data.tracks.items
                setSongsData({
                    type: 'track',
                    data: tracks.map((item) => {
                        return {
                            id: item.id,
                            link: item.external_urls.spotify,
                            name: item.name,
                            image: item.album.images[0].url,
                            artist1: item.artists[0].name,
                            artist2: item.artists[1]?.name,
                            artist3: item.artists[2]?.name,
                            duration: item.duration_ms,
                        }
                    })
                })
                break;
            case 'artist':
                const artist = data.artists.items

                setSongsData({
                    type: 'artist',
                    data: artist.map((item) => {
                        return {
                            id: item.id,
                            link: item.external_urls.spotify,
                            name: item.name,
                            image: item.images[0]?.url
                        }
                    })
                })
                break;
            case 'album':
                const albums = data.albums.items
                setSongsData({
                    type: 'album',
                    data: albums.map((item) => {
                        return {
                            id: item.id,
                            artist: item.artists[0].name,
                            link: item.external_urls.spotify,
                            name: item.name,
                            image: item.images[0].url,
                            release_date: item.release_date,
                            total_tracks: item.total_tracks,
                            artist1: item.artists[0].name,
                            artist2: item.artists[1]?.name,
                            artist3: item.artists[2]?.name
                        }
                    })
                })
                break;
            default:
                break;
        }

        searchInputRef.current.value = ''
    }

    const getSongs = async (id, type, name) => {
        switch (type) {
            case 'album':
                const responseAlbum = await fetch(`https://api.spotify.com/v1/albums/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
                const dataAlbum = await responseAlbum.json()
                const tracks = dataAlbum.tracks.items
                setSongsData({
                    type: 'track',
                    data: tracks.map((item) => {
                        return {
                            id: item.id,
                            link: item.external_urls.spotify,
                            name: item.name,
                            image: dataAlbum.images[0].url,
                            artist1: item.artists[0].name,
                            artist2: item.artists[1]?.name,
                            artist3: item.artists[2]?.name,
                            duration: item.duration_ms,
                        }
                    })
                })
                break;
            case 'artist':
                name.split(' ').join('+')
                const songs = await fetch(
                    `https://api.spotify.com/v1/search?q=${name}&type=track&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

                const songsData = await songs.json()

                const artistTracks = songsData.tracks.items
                setSongsData({
                    type: 'track',
                    data: artistTracks.map((item) => {
                        return {
                            id: item.id,
                            link: item.external_urls.spotify,
                            name: item.name,
                            image: item.album.images[0].url,
                            artist1: item.artists[0].name,
                            artist2: item.artists[1]?.name,
                            artist3: item.artists[2]?.name,
                            duration: item.duration_ms,
                        }
                    })
                })
                break;
            default:
                break;
        }
    }


    return (
        <div className='songs'>
            {accessToken === null ? <Login /> :

                <div className="songs-container">
                    <div className="search-bar">
                        <div className="search-input">
                            <input type="text" id='search' placeholder='Search for songs, artists, albums...' ref={searchInputRef} autoComplete='off' />
                            <select name="filter" id="filter" ref={searchFilterRef}>
                                <option value="">Select a Value</option>
                                <option value="track">Songs</option>
                                <option value="artist">Artists</option>
                                <option value="album">Albums</option>
                            </select>
                        </div>
                        <button className='search' onClick={getData}>Search</button>
                    </div>
                    <div className="songs-data" style={{ visibility: songsData.length == 0 ? 'hidden' : 'visible' }}>
                        <SongsContainer data={songsData} getSongs={getSongs} className="song-card" />
                    </div>
                </div>
            }

        </div>
    )
}

export default Songs