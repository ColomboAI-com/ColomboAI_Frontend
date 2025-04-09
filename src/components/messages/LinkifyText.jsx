"use client";
export default function LinkifiedText({ text }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <span>
      {parts.map((part, i) =>
        part.match(/^https?:\/\//) ? (
          <a
            key={i}
            href={part}
            className="text-white-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
