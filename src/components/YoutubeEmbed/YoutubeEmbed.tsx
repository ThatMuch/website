import LiteYouTubeEmbed from "react-lite-youtube-embed";
import React from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedProps {
  url: string;
  title?: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ url, title }) => {
  // Extract video ID from different YouTube URL structures
  const videoIdMatch = url.match(
    /(?:\?v=|\/embed\/|\.be\/)([^&\n?\s]+)/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) return null;

  return (
    <div className="youtube-embed-wrapper my-4">
      <LiteYouTubeEmbed
        id={videoId}
        title={title || "YouTube video"}
        wrapperClass="yt-lite"
      />
    </div>
  );
};

export default YoutubeEmbed;
