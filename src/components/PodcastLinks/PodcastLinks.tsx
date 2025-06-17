import "./PodcastLinks.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import amazon from "../../images/amazonmusic.svg";
import apple from "../../images/applepodcast.svg";
import spotify from "../../images/spotify.svg";
import youtube from "../../images/youtube-podcast.svg";

type Props = {};

const podcastLinks = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/5WyDmb1QFI1BmryUE0f8Y4?si=90bf60ef53f34909",
    image: spotify,
  },
  {
    name: "Apple Podcast",
    url: "https://podcasts.apple.com/fr/podcast/ipeach/id1771820680?l=fr",
    image: apple,
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/podcasts/b9f41f0c-4082-463b-8f95-bfbf38ea47ba/ipeach",
    image: amazon,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@thatmuch_fr",
    image: youtube,
  },
];

export default function PodcastLinks({}: Props) {
  return (
    <div className="PodcastLinks">
      {podcastLinks.map((link) => (
        <a href={link.url} key={link.name} target="_blank" rel="noreferrer">
          <LazyLoadImage src={link.image} alt={link.name} />
        </a>
      ))}
    </div>
  );
}
