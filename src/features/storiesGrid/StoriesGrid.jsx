import React, { useContext } from "react";
import { PostCard, BirthdayCard, VideoCard } from "features";
import PropTypes from "prop-types";
import "./stories-grid.scss";
import { GlobalContext } from "containers";

export const StoriesGrid = ({ stories }) => {
  const { userData } = useContext(GlobalContext);

  return (
    <div className="stories-grid">
      <h2 className="section-title">News and Stories</h2>
      <div className="stories-grid__stories">
        {stories.map((story) =>
          story.type === "post" ? (
            <PostCard key={story.id} data={story} userData={userData}>
              <img className="post-card__image" src={story.postImage} alt="" />
            </PostCard>
          ) : story.type === "video" ? (
            <PostCard key={story.id} data={story} userData={userData}>
              <VideoCard cover={story.postCover} video={story.postVideo} />
            </PostCard>
          ) : (
            <BirthdayCard key={story.id} data={story} userData={userData} />
          )
        )}
      </div>
    </div>
  );
};

StoriesGrid.propTypes = {
  stories: PropTypes.array,
};
