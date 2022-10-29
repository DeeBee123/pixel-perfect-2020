import React, { useState } from "react";
import PropTypes from "prop-types";
import "./video-card.scss";
import { ReactComponent as ButtonSVG } from "assets/video-button.svg";

/*
  cover: video cover image url
  video: video url
*/

export const VideoCard = ({ cover, video }) => {
  const [playing, setPlaying] = useState(false);

  const toggleVideo = () => {
    setPlaying(!playing);
  };

  return (
    <div className="video-card">
      {playing ? (
        <video
          className="video-card__video"
          autoPlay
          controls
          onEnded={toggleVideo}
        >
          <source src={video} />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="video-card__cover">
          <img
            className="video-card__cover-image"
            src={cover}
            alt="Cover of video."
          />
          <button
            className="svg-button video-card__cover-button"
            type="button"
            onClick={toggleVideo}
          >
            <ButtonSVG />
          </button>
        </div>
      )}
    </div>
  );
};

VideoCard.propTypes = {
  cover: PropTypes.string,
  video: PropTypes.string,
};
