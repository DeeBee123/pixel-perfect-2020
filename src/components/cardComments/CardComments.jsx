import React, { useState } from "react";
import PropTypes from "prop-types";
import { UserImage } from "components";
import "./card-comments.scss";

/*
  commentData: data of a post (post object from db.json > stories)
  userData: data of the user (post object from db.json > userData)
*/

export const CardComments = ({
  data,
  userData,
  focusRef,
  increaseCommentCount,
}) => {
  const [commentCount, setCommentCount] = useState(2); // how many comments to show
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(data.comments);

  const handleNewComment = (e) => {
    e.preventDefault();
    // If the comment only has spaces, don't add the comment
    if (newComment.replace(/\s/g, "").length) {
      const newCommentObject = {
        userName: userData.userName,
        comment: newComment,
        date: new Date(Date.now()),
      };
      setComments((arr) => [...arr, newCommentObject]);
      increaseCommentCount();
    }
    setNewComment("");
  };

  const showMoreComments = () => {
    setCommentCount(commentCount + 3);
  };

  return (
    <div className="card-comments">
      <ul className="card-comments__comments">
        {comments && comments.length ? (
          comments
            .slice(
              comments.length < commentCount
                ? 0
                : comments.length - commentCount,
              comments.length
            )
            .map((comment, id) => (
              <li
                key={`${data.id}-comment-${id}`}
                className="card-comments__comment"
              >
                <span className="card-comments__username">
                  {comment.userName}
                </span>
                <span className="card-comments__comment-text">
                  {comment.comment}
                </span>
              </li>
            ))
        ) : (
          <li>
            <span>No comments yet, be the first one to comment!</span>
          </li>
        )}
        {comments && commentCount < comments.length && (
          <button
            className="card-comments__show-more"
            onClick={showMoreComments}
          >
            Show more
          </button>
        )}
      </ul>
      <div className="card-comments__new-comment">
        <UserImage
          className="post-card__author-photo"
          userName={userData.userName}
          userImage={userData.userImage}
        />
        <form className="card-comments__form" onSubmit={handleNewComment}>
          <input
            ref={focusRef}
            type="text"
            name="comment"
            placeholder="Leave a comment..."
            className="card-comments__input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="card-comments__submit">
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

CardComments.propTypes = {
  data: PropTypes.object,
  userData: PropTypes.object,
  focusRef: PropTypes.object,
  increaseCommentCount: PropTypes.func,
};
