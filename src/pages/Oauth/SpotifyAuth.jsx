import React from "react";

export default function SpotifyAuth() {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = "https://o-auth-callback-sla.vercel.app/api/callbackSpotify";
    const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative";
    const responseType = "code";

    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
  };

  return (
    <div>
      <h1>OAuth</h1>
      <h2>Spotify has no such thing as  test mode, so you can go ahead and login with your own account</h2>
      <h3>(trust me I'm not stealing your data. If I was capable of that I'd be far more valuable!😂)</h3>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}
