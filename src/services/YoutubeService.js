import axios from "axios";

//Fetch YT PLaylist Items
export async function fetchYTPLaylist(
  pageToken = "",
  playListItemsAcc = [],
  playListID
) {
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
        return fetchYTPLaylist(res.data.nextPageToken, allItems, playListID);
      } else {
        return allItems; // Resolve with all fetched items
      }
    });
}
