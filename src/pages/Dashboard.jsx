import React, { useEffect, useState } from "react";
import { ArrowRight, ServerCog } from "lucide-react";
import axios from "axios";

//Importing Custom Hooks
import { useLogin } from "../hooks/useLogin";
import { uselinkParser } from "../hooks/useLinkParser";

export default function Dashboard() {
  // Login Check
  useLogin();

  const [done, setDone] = useState(true);

  const [link, setLink] = useState("");
  const [service, playListID] = uselinkParser(link);

  const [playListItems, setPLayListItems] = useState([]);
  const [trackIDs, setTrackIDs] = useState([]);

  async function handleYTToSpotify() {
    //Fetch YT PLaylist Items
    async function fetchYTPLaylist(pageToken) {
      await axios
        .get("https://www.googleapis.com/youtube/v3/playlistItems", {
          params: {
            part: "snippet",
            playlistId: playListID,
            key: "AIzaSyBDAZp4acUkJAF_jVOjSnaplaVVglYjEuQ",
            pageToken,
          },
        })
        .then((res) => {
          res.data.items.map((e) => {
            setPLayListItems((prev) => [...prev, e.snippet.title]);
          });
          if (res.data.nextPageToken) {
            fetchYTPLaylist(res.data.nextPageToken);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //Create Spotify Playlist
    async function createSpotifyPlaylist() {
      await axios
        .post(
          "https://api.spotify.com/v1/users/31ollgelkkxc2k6bu2q4vc2r2avq/playlists",
          {
            name: "API Playlist",
          },
          {
            headers: {
              Authorization:
                "Bearer " + sessionStorage.getItem("spotify_access_token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //Get spotify IDs for YT songs
    async function getSpotifyIDs() {
      for (let i = 0; i++; i < playListItems.length) {
        await axios
          .get("https://api.spotify.com/v1/search", {
            params: {
              q: req.query.q,
              type: "track",
              limit: 1,
            },
            headers: {
              Authorization:
                "Bearer " + sessionStorage.getItem("spotify_access_token"),
            },
          })
          .then((res) => {
            setTrackIDs((prev) => [...prev, res.data.tracks.items[0].id]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    //Add songs to newly created spotify playlist
    async function addToSpotifyPlaylist() {}

    setDone(false);
    await fetchYTPLaylist();
    await createSpotifyPlaylist();
    await getSpotifyIDs();
    await addToSpotifyPlaylist();
    setDone(true);
  }

  function handleSpotifyToYT() {}

  console.log(trackIDs);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <input
        type="text"
        placeholder="Paste Playlist Link Here"
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
        className="flex justify-between gap-4"
      >
        <span>{service}</span>
        <ArrowRight />
        <span>
          {service === "youtube" ? "spotify" : ""}
          {service === "spotify" ? "youtube" : ""}
        </span>
        {done === false ? "Working..." : ""}
      </button>
    </div>
  );
}
