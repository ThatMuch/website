import React from "react";

interface SpotifyEmbedProps {
  url: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ url }) => {
  // Convert standard spotify URL to embed URL
  // Example: https://open.spotify.com/episode/1ckIIhN7YXpwR8ta9o3BOo?si=HyJjUP6oTW6enispY4N2dg
  // To: https://open.spotify.com/embed/episode/1ckIIhN7YXpwR8ta9o3BOo?utm_source=generator

  let embedUrl = url;

  if (url.includes("open.spotify.com")) {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);

    // Check if it's already an embed URL
    if (pathParts[0] !== "embed") {
      // Insert 'embed' right after the domain
      embedUrl = `https://open.spotify.com/embed/${pathParts.join("/")}?utm_source=generator`;
    }
  }

  return (
    <div className="spotify-embed-wrapper my-4">
      <iframe
        style={{ borderRadius: "12px" }}
        src={embedUrl}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;
