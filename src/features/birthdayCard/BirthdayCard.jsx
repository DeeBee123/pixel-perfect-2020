import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./birthday-card.scss";
import { CardComments, UserImage } from "components";
import { ReactComponent as GiftSVG } from "assets/gift.svg";
import { ReactComponent as CommentSVG } from "assets/comments-rounded.svg";

/*
  data: data about the post (post object from db.json > stories)
  userData: data of the user (post object from db.json > userData)
*/

export const BirthdayCard = ({ data, userData }) => {
  const commentInputRef = useRef();
  const [wished, setWished] = useState(false);
  const [wishesCount, setwishesCount] = useState(data.wishes || 0);
  const [commentsCount, setCommentsCount] = useState(
    data.comments ? data.comments.length : 0
  );

  const handleWish = () => {
    if (wished) {
      setwishesCount(wishesCount - 1);
    } else {
      setwishesCount(wishesCount + 1);
    }
    setWished(!wished);
  };

  const handleComment = () => {
    setCommentsCount(commentsCount + 1);
  };

  const focusComment = () => {
    if (commentInputRef?.current) {
      commentInputRef.current.focus();
    }
  };

  const birthdayDate = new Date(data.birthdayDate);
  const formattedBirthdayDate =
    birthdayDate.toLocaleString("en", { month: "short" }) +
    " " +
    birthdayDate.getDate();

  return (
    <div className="birthday-card">
      <div className="birthday-card__content">
        <img
          className="birthday-card__decoration"
          src={require("assets/confetti.png")}
          alt="confetti"
        />
        <div className="birthday-card__author-info">
          <UserImage
            className="birthday-card__author-photo"
            userName={data.userName}
            userImage={data.userImage}
          />
          <p className="birthday-card__author-name">{data.userName}</p>
          <p className="birthday-card__author-birthday">
            <span className="birthday-card__author-birthday-text">
              Celebrated a birthday on
            </span>{" "}
            {formattedBirthdayDate}
          </p>
          <p className="birthday-card__author-encouragement">Send a wish!</p>
        </div>
        <img
          className="birthday-card__decoration"
          src={require("assets/gift-opened.png")}
          alt="opened gift"
        />
      </div>
      <div className="birthday-card__stats">
        <button
          className="svg-button svg-button--scale birthday-card__stats-svg"
          onClick={handleWish}
        >
          <GiftSVG
            className={
              wished
                ? `birthday-card__wish birthday-card__wish--wished`
                : `birthday-card__wish`
            }
          />
          <span className="sr-only">Wish a happy birthday</span>
        </button>
        <span className="birthday-card__stats-count">{wishesCount}</span>

        <button className="svg-button svg-button--scale" tabIndex="-1">
          <CommentSVG
            className="birthday-card__stats-svg"
            onClick={focusComment}
          />
          <span className="sr-only">Comment</span>
        </button>
        <span className="birthday-card__stats-count">{commentsCount}</span>
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

BirthdayCard.propTypes = {
  data: PropTypes.object,
  userData: PropTypes.object,
};
