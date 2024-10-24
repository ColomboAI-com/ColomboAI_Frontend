/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";

export default function Vibes({ filter }) {
  const { vibes, getVibes, fetchSongById } = useContext(VibeContext);
  const [song, setSong] = useState({});
  const [vibe, setVibe] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = typeof Audio !== 'undefined' ? new Audio() : null;
  }, []);
  
  useEffect(() => {
    getVibes();

    const fetchSong = async () => {
      try {
        // const result = await fetchSongById("1295528");
        const result = await fetchSongById();
        setSong(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSong();
  }, []);

  useEffect(() => {
    if (vibes) {
      setVibe(vibes[0]);
    }
  })

  useEffect(() => {
    if (audioRef.current && song && song.audio) {
      audioRef.current.src = song.audio;
      audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
    }
  }, [song]);
  // console.log(song);

  return (
    <div>
      {vibes.map((vibe) => (
        <Vibe vibe={vibe} key={vibe._id} />
      ))}
    </div>
  );
}
