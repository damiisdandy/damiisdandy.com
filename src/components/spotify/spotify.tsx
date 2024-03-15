"use client";

import { SPOTIFY_PLAYLIST_ID } from "~/constants";

export default function Spotify() {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
      width="100%"
      height="380"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  );
}
