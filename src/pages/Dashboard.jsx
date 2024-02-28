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

  async function handleYTToSpotify() {
    //Fetch YT PLaylist Items
    function fetchYTPLaylist(pageToken = "", playListItemsAcc = []) {
      return axios
        .get("https://www.googleapis.com/youtube/v3/playlistItems", {
          params: {
            part: "snippet",
            playlistId: playListID,
            key: "AIzaSyBDAZp4acUkJAF_jVOjSnaplaVVglYjEuQ",
            pageToken,
          },
        })
        .then((res) => {
          const newItems = res.data.items.map((e) => e.snippet.title);
          const allItems = [...playListItemsAcc, ...newItems];
          if (res.data.nextPageToken) {
            return fetchYTPLaylist(res.data.nextPageToken, allItems);
          } else {
            return allItems; // Resolve with all fetched items
          }
        });
    }

    //Create Spotify Playlist
    async function createSpotifyPlaylist() {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${sessionStorage.getItem(
          "spotifyID"
        )}/playlists`,
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
      );
      const playlistId = response.data.id; // Assuming the response includes the playlist ID
      console.log("Created Spotify playlist ID:", playlistId);
      return playlistId;
    }

    //Get spotify IDs for YT songs
    async function getSpotifyIDs(playListItems) {
      const requests = playListItems.map((item) => {
        return axios
          .get("https://api.spotify.com/v1/search", {
            params: {
              q: item, // Assuming you meant to search for the item here
              type: "track",
              limit: 1,
            },
            headers: {
              Authorization:
                "Bearer " + sessionStorage.getItem("spotify_access_token"),
            },
          })
          .then((res) => {
            return res.data.tracks.items.length > 0
              ? res.data.tracks.items[0].id
              : null;
          })
          .catch((err) => {
            console.error("Error fetching Spotify ID for item:", item, err);
            return null; // Return null or some indication of failure
          });
      });

      const trackIds = await Promise.all(requests);
      return trackIds.filter((id) => id !== null); // Filter out nulls if any request failed
    }

    //Add songs to newly created spotify playlist
    async function addToSpotifyPlaylist(playlistId, trackIds) {
      const uris = trackIds.map((id) => `spotify:track:${id}`);
      await axios
        .post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris: uris,
            position: 0,
          },
          {
            headers: {
              Authorization:
                "Bearer " + sessionStorage.getItem("spotify_access_token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then()
        .catch((err) => {
          console.log(err);
        });
      console.log(`Added tracks to Spotify playlist ${playlistId}`);
    }

    //Calling functions
    setDone(false);

    const allPlaylistItems = await fetchYTPLaylist();
    const trackIds = await getSpotifyIDs(allPlaylistItems); // Fetch and directly use the track IDs

    const playlistId = await createSpotifyPlaylist();
    await addToSpotifyPlaylist(playlistId, trackIds); // Pass the fetched track IDs directly

    setDone(true);
  }

  function handleSpotifyToYT() {}

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
