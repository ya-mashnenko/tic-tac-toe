import React from "react";

export function NewGameButton(props) {
  return (
    <button className="history-button" onClick={props.startNewGame}>
      New Game
    </button>
  );
}
