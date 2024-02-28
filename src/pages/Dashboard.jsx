import React, { useState } from "react";
import { ArrowRight, Youtube, Disc2 } from "lucide-react";
import { Spinner } from "@material-tailwind/react";

//Importing Custom Hooks
import { useLogin } from "../hooks/useLogin";
import { uselinkParser } from "../hooks/useLinkParser";

//Importing service functions
import { fetchYTPLaylist } from "../services/YoutubeService";
import {
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

  function handleSpotifyToYT() {}

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Youtube/Spotify Playlist"
        className="p-2 rounded-full w-full text-center"
        onChange={(e) => {
          setLink(e.target.value);
        }}
        value={link}
      />

      <button
        onClick={() => {
          if (service === "youtube") {
            handleYTToSpotify();
          } else if (service === "spotify") {
            handleSpotifyToYT();
          }
        }}
        className="flex justify-center gap-8"
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
          <span>Working on it...</span>
        )}
      </button>

      {finalLink === "" ? null : (
        <span>
          Access your playlist{" "}
          <a href={finalLink} target="blank">
            here
          </a>
        </span>
      )}
    </div>
  );
}
