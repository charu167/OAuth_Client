import React, { useState } from "react";
import { ArrowRight, Youtube, Disc2 } from "lucide-react";
import { Spinner } from "@material-tailwind/react";

//Importing Custom Hooks
import { useLogin } from "../hooks/useLogin";
import { uselinkParser } from "../hooks/useLinkParser";

//Importing service functions
import {
  fetchYTPLaylist,
  getYoutubeIDs,
  createYouTubePlaylist,
  addVideosToYouTubePlaylist,
} from "../services/YoutubeService";
import {
  fetchSpotifyPlaylist,
  getSpotifyIDs,
  createSpotifyPlaylist,
  addToSpotifyPlaylist,
} from "../services/SpotifyService";

export default function Dashboard() {
  // Login Check
  useLogin();

  //state variables
  const [done, setDone] = useState(true);
  const [link, setLink] = useState("");

  //service='youtube'/'spotify' playlistID='ytplay1234..'
  const [service, playListID] = uselinkParser(link);

  const [finalLink, setFinalLink] = useState("");

  async function handleYTToSpotify() {
    //Calling functions
    setDone(false);

    const allPlaylistItems = await fetchYTPLaylist("", [], playListID);
    const trackIds = await getSpotifyIDs(allPlaylistItems); // Fetch and directly use the track IDs

    const playlistId = await createSpotifyPlaylist();
    await addToSpotifyPlaylist(playlistId, trackIds); // Pass the fetched track IDs directly

    setFinalLink(`https://open.spotify.com/playlist/${playlistId}`);
    setDone(true);
  }

  async function handleSpotifyToYT() {
    //Calling functions
    setDone(false);

    const tracks = await fetchSpotifyPlaylist(playListID);
    const videoIDs = await getYoutubeIDs(tracks);
    const youtubePlaylistId = await createYouTubePlaylist("SyncWave Playlist");
    await addVideosToYouTubePlaylist(youtubePlaylistId, videoIDs);

    setFinalLink(`https://www.youtube.com/playlist?list=${youtubePlaylistId}`);
    setDone(true);
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-green-950 via-green-950 to-green-950 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 w-11/12 md:w-2/3 lg:w-1/2 relative">
        <h2 className="text-3xl font-extrabold text-black text-center mb-2">
          Convert Your Playlist Effortlessly
        </h2>
        <p className="text-gray-500 font-semibold text-base text-center mb-6">
          Paste the link of a YouTube or Spotify public playlist below to start the magic!
        </p>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter YouTube/Spotify Playlist URL"
            className="p-4 rounded-lg w-full border border-green-950 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg placeholder-gray-400 text-center"
            onChange={(e) => {
              setLink(e.target.value);
            }}
            value={link}
          />
          {/* <div className="absolute inset-y-0 right-4 flex items-center gap-2">
            <Youtube className="text-red-500 w-5 h-5" />
            <Disc2 className="text-green-500 w-5 h-5" />
          </div> */}
        </div>
        <button
          onClick={() => {
            if (service === "youtube") {
              handleYTToSpotify();
            } else if (service === "spotify") {
              handleSpotifyToYT();
            }
          }}
          className="w-full py-3 bg-green-700 text-white font-semibold rounded-full shadow-lg hover:bg-green-800 transition flex items-center justify-center gap-4 mb-6"
        >
          {done ? (
            <>
              <span>
                {service === "youtube" ? <Youtube /> : ""}
                {service === "spotify" ? <Disc2 /> : ""}
              </span>
              <ArrowRight />
              <span>
                {service === "youtube" ? <Disc2 /> : ""}
                {service === "spotify" ? <Youtube /> : ""}
              </span>
            </>
          ) : (
            <span>Processing your request...</span>
          )}
        </button>
        {finalLink && (
          <div className="text-center">
            <span className="text-gray-700">
              Your converted playlist is ready: {" "}
              <a href={finalLink} target="_blank" rel="noopener noreferrer" className="text-green-700 font-medium underline">
                Click here to access
              </a>
            </span>
          </div>
        )}
        <div className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center shadow-md">
          🎵
        </div>
      </div>
    </div>
  );
}
