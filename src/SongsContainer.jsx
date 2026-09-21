import React from 'react'
import { Link } from 'react-router-dom'

const SongsContainer = ({ data, getSongs }) => {
    return (
        <>
            {
                data?.data?.map((item) => (
                    <div key={item.id} className='song-card'>
                        <div>
                            <p>{item.name}</p>
                            {
                                data.type == 'track' || data.type == 'album' ?
                                    <p>
                                        By : {item.artist1}
                                        {item.artist2 ? ', ' + item.artist2 + ', ' : ''}
                                        {item.artist3 ? item.artist3 : ''}
                                    </p>
                                    :
                                    ''
                            }
                            {
                                data.type == 'track' ?
                                    <div>
                                        <p>Duration : {Math.floor(item.duration / 60000) + ':' + String(Math.floor((item.duration % 60000) / 1000)).padStart(2, '0')}</p>
                                        <Link to={`/song/${item.id}`} className='play'>▶︎ Play</Link>
                                    </div>
                                    :
                                    ''
                            }
                            {
                                data.type == 'artist' ?
                                    <button className='get-songs' onClick={() => getSongs(item.id, 'artist', item.name)}>
                                        Get Songs
                                    </button>
                                    : ''
                            }
                            {
                                data.type == 'album' ?
                                    <div className='album-info'>
                                        <div>
                                            <p>Release Date : {item.release_date}</p>
                                            <p>Total Tracks : {item.total_tracks}</p>
                                        </div>
                                        <div>
                                            <button className='get-songs-album' onClick={() => getSongs(item.id, 'album')}>
                                                Get Songs
                                            </button>
                                        </div>
                                    </div>
                                    : ''

                            }
                        </div>
                        {
                            item.image == undefined
                                ?
                                <div className='no-image'>No Image</div>
                                :
                                <img src={item.image} alt={item.name} />
                        }
                    </div>
                ))
            }
        </>
    )
}

export default SongsContainer