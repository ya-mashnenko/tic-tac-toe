import React from "react";

export function HistoryButton(props) {
  return (
    <button className="history-button" onClick={props.showHistoryButton}>
      {props.showHistory ? "Show history" : "Hide history"}
    </button>
  );
}
