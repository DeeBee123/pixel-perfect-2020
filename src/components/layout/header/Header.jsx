import React, { useContext } from "react";
import { NotificationsWidget, UserProfileWidget } from "./components";
import "./header.scss";
import { GlobalContext } from "containers";

export const Header = () => {
  const { userData } = useContext(GlobalContext);

  return (
    <header className="header">
      <NotificationsWidget notifications={userData.notifications} />
      <UserProfileWidget
        userName={userData.userName}
        userImage={userData.userImage}
      />
    </header>
  );
};
