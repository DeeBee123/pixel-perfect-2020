import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./post-card.scss";
import { RedHeart, CardComments, UserImage } from "components";
import { ReactComponent as CommentSVG } from "assets/comments-rounded.svg";

/*
  data: data about the post (post object from db.json > stories)
  userData: data of the user (post object from db.json > userData)
  children: image or video
*/

export const PostCard = ({ data, userData, children }) => {
  const commentInputRef = useRef();
  const [likesCount, setLikesCount] = useState(data.likes || 0);
  const [commentsCount, setCommentsCount] = useState(
    data.comments ? data.comments.length : 0
  );

  const handleLike = (liked) => {
    if (liked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
  };

  const handleComment = () => {
    setCommentsCount(commentsCount + 1);
  };

  const focusComment = () => {
    if (commentInputRef?.current) {
      commentInputRef.current.focus();
    }
  };

  const minutesSincePosted = data.postDate
    ? Math.floor((Date.now() - new Date(data.postDate)) / 60000)
    : -1;

  // if the time is negative the date is in the future/undefined so render nothing.
  let timeSincePost = "";

  if (minutesSincePosted >= 0) {
    switch (true) {
      case minutesSincePosted < 1:
        timeSincePost = "Just now";
        break;
      case minutesSincePosted < 60:
        timeSincePost = `${Math.floor(minutesSincePosted)}m`;
        break;
      case minutesSincePosted < 60 * 24:
        timeSincePost = `${Math.floor(minutesSincePosted / 60)}h`;
        break;
      case minutesSincePosted < 60 * 24 * 365:
        timeSincePost = `${Math.floor(minutesSincePosted / 60 / 24)}d`;
        break;
      default:
        timeSincePost = `${Math.floor(minutesSincePosted / 60 / 24 / 365)}y`;
    }
  }

  return (
    <div className="post-card">
      <header className="post-card__header">
        <div className="post-card__author-info">
          <UserImage
            className="post-card__author-photo"
            userName={data.userName}
            userImage={data.userImage}
          />
          <span className="post-card__author-name">{data.userName}</span>
        </div>
        <div className="post-card__post-info">
          <span className="post-card__location">{data.postLocation}</span>
          <span className="post-card__date">{timeSincePost}</span>
        </div>
      </header>
      <div className="post-card__content">{children}</div>
      <div className="post-card__stats">
        <RedHeart className="post-card__stats-svg" onClick={handleLike} />
        <span className="post-card__stats-count">{likesCount}</span>

        <button className="svg-button svg-button--scale" tabIndex="-1">
          <CommentSVG className="post-card__stats-svg" onClick={focusComment} />
          <span className="sr-only">Comment</span>
        </button>
        <span className="post-card__stats-count">{commentsCount}</span>
      </div>
      <CardComments
        data={data}
        userData={userData}
        focusRef={commentInputRef}
        increaseCommentCount={handleComment}
      />
    </div>
  );
};

PostCard.propTypes = {
  data: PropTypes.object,
  userData: PropTypes.object,
  children: PropTypes.node,
};
