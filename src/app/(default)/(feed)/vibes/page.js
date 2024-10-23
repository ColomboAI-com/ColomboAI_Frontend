/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";

export default function Vibes({ filter }) {
  const { vibes, getVibes, fetchSongById } = useContext(VibeContext);
  const [song, setSong] = useState({});
  const [vibe, setVibe] = useState({});

  useEffect(() => {
    getVibes();

    const fetchSong = async () => {
      try {
        // const result = await fetchSongById("1129600");
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
  });

  return (
    <div>
      {vibes.map((vibe) => (
        <Vibe vibe={vibe} key={vibe._id} />
      ))}
    </div>
  );
}
