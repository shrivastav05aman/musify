import React from 'react'

const Login = () => {
    const CLIENT_ID = '60a12d35f70a4072a8b68479588e1573'
    const REDIRECT_URI = 'http://127.0.0.1:5173/callback'
    const SCOPES = [
        "user-read-private",
        "user-read-email",
        "playlist-read-private",
        "user-top-read",
        "user-library-read",
    ].join(' ')

    function generateCodeVerifier(length = 128) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
            .map((b) => chars[b % chars.length])
            .join('')
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier)
        const digest = await crypto.subtle.digest('SHA-256', data)
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '')
    }

    async function redirectToSpotify() {
        const codeVerifier = generateCodeVerifier()
        const codeChallenge = await generateCodeChallenge(codeVerifier)
        sessionStorage.setItem('pkce_verifier', codeVerifier)

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SCOPES,
            redirect_uri: REDIRECT_URI,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
        })

        window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
    }

    const accessToken = sessionStorage.getItem('spotify_access_token')
    return (
        <div className='login'>
            <h1>Welcome to World of Songs</h1>
            <button onClick={redirectToSpotify} >Get Started</button>
        </div>
    )
}

export default Login