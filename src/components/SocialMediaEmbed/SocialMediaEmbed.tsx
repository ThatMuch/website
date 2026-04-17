import React from "react";
import { InstagramEmbed, TikTokEmbed, XEmbed } from "react-social-media-embed";
import "./SocialMediaEmbed.scss";
interface SocialMediaEmbedProps {
    url: string;
}

const SocialMediaEmbed: React.FC<SocialMediaEmbedProps> = ({ url }) => {
	const isInstagram = url.includes("instagram.com");
	const isTiktok = url.includes("tiktok.com");
	const isX = url.includes("x.com");

    return (
        <div className="social-media-embed-wrapper my-4 d-flex justify-content-center">
            {isInstagram && <InstagramEmbed
                url={url}

            />}
            {isTiktok && <TikTokEmbed
				url={url}
				    width={324}

            />}
			{isX && <XEmbed
                url={url}

            />}
        </div>
    );
};

export default SocialMediaEmbed;
