"use client";

import { SPOTIFY_PLAYLIST_ID } from "~/constants";

export default function Spotify() {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
      width="100%"
      height="380"
      style={{ colorScheme: "normal" }}
      className="overflow-hidden rounded-xl bg-neutral-800"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  );
}
