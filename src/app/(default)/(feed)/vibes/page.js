/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";

export default function Vibes({ filter }) {
  const { vibes, getVibes, fetchSongById } = useContext(VibeContext);
  
  useEffect(() => {
    getVibes();
  }, []);

  return (
    <div>
      {vibes.map((vibe) => (
        <Vibe vibe={vibe} key={vibe._id} />
      ))}
    </div>
  );
}
