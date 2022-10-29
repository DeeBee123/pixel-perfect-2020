import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./notifications-widget.scss";
import { ReactComponent as IconBell } from "assets/notification-bell.svg";
import { ReactComponent as GiftColored } from "assets/gift-colored.svg";
import { ReactComponent as HeartColored } from "assets/heart-colored.svg";
import { ReactComponent as CommentIcon } from "assets/comments-rounded.svg";

export const NotificationsWidget = ({ notifications }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const notificationsMenuRef = useRef(null);

  useEffect(() => {
    // check to see if notifications menu is big enough to be scrollable and
    // apply styles and tabIndex according to the result
    if (isMenuOpen && notificationsMenuRef?.current) {
      const menu = notificationsMenuRef.current;
      if (menu.scrollHeight > menu.clientHeight) {
        menu.classList.add("user-profile-widget__menu--scrollable");
        menu.classList.remove("user-profile-widget__menu--scroll--disabled");
        setIsScrollable(true);
      } else {
        menu.classList.remove("user-profile-widget__menu--scrollable");
        menu.classList.add("user-profile-widget__menu--scroll-disabled");
        setIsScrollable(false);
      }
    }
  }, [isMenuOpen]);

  const renderLikeNotification = (userName) => (
    <>
      <HeartColored className="notifications__icon" />
      <p className="notifications__text">
        <span className="notifications__highlight">{userName}</span> liked your
        post.
      </p>
    </>
  );

  const renderWishNotification = (userName) => (
    <>
      <GiftColored className="notifications__icon" />
      <p className="notifications__text">
        <span className="notifications__highlight">{userName}</span> wished you
        a happy birthday.
      </p>
    </>
  );

  const renderCommentNotification = (userName) => (
    <>
      <CommentIcon className="notifications__icon" />
      <p className="notifications__text">
        <span className="notifications__highlight">{userName}</span> commented
        on your post.
      </p>
    </>
  );

  const notificationsToRender = notifications.map((notification, id) => (
    <li
      key={`${notification.postID}-notification-${notification.userName}-${notification.actionType}`}
      className={
        id === 0
          ? "user-profile-widget__menu-item user-profile-widget__menu-link user-profile-widget__menu-link--with-triangle"
          : "user-profile-widget__menu-item user-profile-widget__menu-link"
      }
    >
      {notification.actionType === "Like"
        ? renderLikeNotification(notification.userName)
        : notification.actionType === "Wish"
        ? renderWishNotification(notification.userName)
        : renderCommentNotification(notification.userName)}
    </li>
  ));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBlur = (e) => {
    if (isMenuOpen && !e.currentTarget.contains(e.relatedTarget)) {
      toggleMenu();
    }
  };

  return (
    <div className="user-profile-widget notifications" onBlur={handleBlur}>
      <button
        className="user-profile-widget__button notifications__button"
        onClick={toggleMenu}
      >
        <IconBell />
        <span className="sr-only">Notifications</span>
        {notifications && notifications.length > 0 && (
          <div className="notifications__red-circle"></div>
        )}
      </button>
      {isMenuOpen && (
        <div
          ref={notificationsMenuRef}
          className="
            user-profile-widget__menu
            user-profile-widget__menu-scroll--disabled"
          onBlur={handleBlur}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={isScrollable ? "0" : "-1"}
        >
          <ul className="user-profile-widget__menu-list">
            {notificationsToRender.length ? (
              notificationsToRender
            ) : (
              <li
                className="
                  user-profile-widget__menu-item
                  user-profile-widget__menu-link
                  user-profile-widget__menu-link--with-triangle
                  notifications__more"
              >
                <p>There are no new notifications.</p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

NotificationsWidget.propTypes = {
  notifications: PropTypes.array,
};
