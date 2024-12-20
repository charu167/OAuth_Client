import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen w-full flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-6xl text-center font-extrabold text-gray-800 mb-4">SyncWave</h1>
        <p className="text-lg font-medium text-gray-600">
          Effortlessly sync playlists between YouTube and Spotify.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-green-950 flex flex-col justify-center items-center">
        <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:text-white transition">
          <Link to="/dashboard">Start Syncing!</Link>
        </button>
      </div>
    </div>
  );
}
