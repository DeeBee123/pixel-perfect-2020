import React, { useEffect, useState, useContext } from "react";
import "./hello.scss";
import { GlobalContext } from "containers";

export const Hello = () => {
  const [date, setDate] = useState(new Date());
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    const interval = setInterval(() => tick(), 60000);
    return () => clearInterval(interval);
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  const renderGreeting = () => {
    const hour = date.getHours();

    switch (true) {
      case hour < 5:
        return "evening";
      case hour < 12:
        return "morning";
      case hour < 17:
        return "afternoon";
      case hour > 16:
        return "evening";

      default:
        return null;
    }
  };

  return (
    <div className="hello-widget">
      <h2 className="hello-widget__time">
        {date.toLocaleTimeString(["en-GB"], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h2>
      <h2 className="hello-widget__greeting">
        Good {renderGreeting()}, {userData.userName}
      </h2>
    </div>
  );
};
