import React, { useContext } from "react";
import { ReactComponent as SourceryLogo } from "assets/sourcery-logo.svg";
import { GetStartedList } from "features";
import { GlobalContext } from "containers";

export const DbUsageExample = () => {
  const { instructions } = useContext(GlobalContext);

  return (
    <div className="instructions">
      <header className="instructions-header">
        <SourceryLogo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GetStartedList key={instructions.length} instructions={instructions} />
    </div>
  );
};
