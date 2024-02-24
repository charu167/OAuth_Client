import React from "react";

export default function SpotifyAuth() {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = "https://o-auth-callback-sla.vercel.app/api/callbackSpotify";
    const scope = "user-read-private user-read-email";
    const responseType = "code";

    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
  };

  return (
    <div>
      <h1>OAuth</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}
