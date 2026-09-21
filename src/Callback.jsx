import React, { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'

const Callback = () => {
    const CLIENT_ID = '60a12d35f70a4072a8b68479588e1573'
    const REDIRECT_URI = 'http://127.0.0.1:5173/callback'
    const [searchParams] = useSearchParams()
    const [isAccessTokenReceived, setIsAccessTokenReceived] = useState(false)


    async function exchangeCodeForToken(code) {
        const codeVerifier = sessionStorage.getItem('pkce_verifier')
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                code_verifier: codeVerifier,
            }),
        })


        if (!res.ok)
            throw new Error('Token exchange failed')
        return (
            res.json()
        )
    }

    return (
        <div className='callback'>
            <h1>Processing Spotify login...</h1>
            <p>Please wait while we complete your authentication.</p>
            <button
                onClick={() => exchangeCodeForToken(searchParams.get('code')).then(token => {
                    setIsAccessTokenReceived(true)
                    sessionStorage.setItem('spotify_access_token', token.access_token)
                }).catch(err => {
                    console.error('Error exchanging code for token:', err)
                })}
            >
                Go to Songs
            </button>
            {isAccessTokenReceived && <Navigate to="/songs" />}
        </div>
    )
}

export default Callback
