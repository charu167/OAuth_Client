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
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-4">Spotify OAuth</h1>
        <p className="text-gray-800 text-center mb-6">
          Spotify does not have a test mode, so you can go ahead and log in with your own account.
        </p>
        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h3 className="text-gray-700 font-medium text-center">
            (Trust me, I'm not stealing your data. If I was capable of that, I'd be far more valuable! 😂)
          </h3>
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition">
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
