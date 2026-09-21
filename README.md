# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

Musify

> A clean, Spotify-powered way to discover songs, artists, and albums.

Musify is a React music discovery interface that combines Spotify search with a compact, route-based browsing experience. Search the catalogue, open an album or artist to explore related tracks, and launch a track in Spotify's embedded player.

## Features

- Spotify PKCE authentication flow
- Search by song, artist, or album
- Album and artist drill-down views
- Track cards with artwork, artists, and duration
- Spotify embedded playback route
- Client-side routing for home, search, callback, and player views

## Built With

- React 19
- Vite 8
- React Router 7
- Spotify Web API
- Spotify Embed Player

## Getting Started

Requires Node.js 20 or newer.

```bash
git clone https://github.com/<your-username>/<repository-name>.git
npm install
npm run dev
```

After cloning, open the cloned project folder in your terminal or VS Code and run the commands above from its root directory.

The app expects the Spotify app to allow this callback URL:

```text
http://127.0.0.1:5173/callback
```

The local Spotify client configuration is kept in `.env`. Do not commit private credentials or replace them with a client secret in browser code; this project uses Spotify's PKCE flow for a public client.

## Available Scripts

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Routes

| Route       | View                             |
| ----------- | -------------------------------- |
| `/`         | Welcome screen                   |
| `/songs`    | Authenticated Spotify search     |
| `/song/:id` | Embedded Spotify track player    |
| `/callback` | OAuth callback and token handoff |

## Project Notes

The access token and PKCE verifier are stored in `sessionStorage`, so authentication is scoped to the current browser session. Spotify API availability, artwork, and playback behavior depend on the logged-in account and Spotify's current API policies.

## Project Structure

```text
Musify/
├── public/                    # Static files served without processing
├── src/
│   ├── assets/                # Images and other imported media
│   │   └── hero.png           # Home page hero artwork
│   ├── App.jsx                # Application shell and route definitions
│   ├── App.css                # Layout and component styles
│   ├── Callback.jsx           # Spotify OAuth callback and token handoff
│   ├── Home.jsx               # Landing page and login entry point
│   ├── Login.jsx              # Spotify PKCE authorization flow
│   ├── Navbar.jsx             # Shared application navigation
│   ├── SongPlayer.jsx         # Spotify embedded track player view
│   ├── Songs.jsx              # Search page and Spotify data loading
│   ├── SongsContainer.jsx     # Reusable track, album, and artist results
│   ├── index.css              # Global resets and base styles
│   └── main.jsx               # React entry point and router mounting
├── .env                      # Local configuration; keep credentials private
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # Vite HTML entry document
├── package.json              # Scripts and dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

## Live Preview

<video controls width="100%">
    <source src="./src/assets/live-preview.mp4" type="video/mp4">
    <a href="./src/assets/live-preview.mp4">Download the project demo video</a>
</video>

### Source Organization

- `App.jsx` owns the application shell and maps URLs to page components.
- Page components such as `Home.jsx`, `Songs.jsx`, and `SongPlayer.jsx` represent route-level views.
- `Navbar.jsx` and `SongsContainer.jsx` are shared UI components used across views.
- Spotify authentication and token exchange are kept in `Login.jsx` and `Callback.jsx`.
- Styles are split between `index.css` for global rules and `App.css` for application UI.

## Future Improvements

- Add search debouncing, loading states, empty states, and clearer API error messages.
- Support pagination or infinite scrolling for large search results.
- Add filters and sorting for tracks, albums, and artists.
- Display richer artist and album pages with biographies, genres, related releases, and tracklists.
- Add recently played, saved tracks, playlists, and personalized recommendations where Spotify permissions allow it.
- Refresh expired access tokens and provide a clear sign-out flow.
- Move Spotify API requests into a dedicated service layer and centralize response and error handling.
- Add reusable UI components and custom hooks as the application grows.
- Improve keyboard navigation, focus states, responsive layouts, and screen-reader labels.
- Add automated tests for authentication, routing, search results, and player navigation.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<h2>Author</h2>
<ul>
    <li>Github : <a href = "https://github.com/shrivastav05aman">@shrivastav05aman</a></li>
</ul>
