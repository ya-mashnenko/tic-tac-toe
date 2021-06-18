import React from "react";
import ReactDOM from "react-dom";
import { HistoryButton } from "./components/Buttons/History";
import { NewGameButton } from "./components/Buttons/NewGame";
import { Board } from "./components/Board";
import { calculateWinner } from "./helper";
import "./styles/index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      showHistory: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  showHistoryButton = () => {
    this.setState((prevState) => {
      return { showHistory: !prevState.showHistory };
    });
  };

  startNewGame = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      showHistory: true,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? `Go to #${move}` : `Start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className="move-buttons">
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = `${winner} is winner!`;
    } else if (!current.squares.includes(null)) {
      status = "Dead Heat";
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="game">
        <h1>{status}</h1>
        <div className="button-container">
          <HistoryButton
            showHistoryButton={this.showHistoryButton}
            showHistory={this.state.showHistory}
          />
          <NewGameButton startNewGame={this.startNewGame} />
        </div>
        <div className="history-list">
          <ul className="history">{!this.state.showHistory ? moves : null}</ul>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
