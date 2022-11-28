// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Stage from "./components/Stage";
import { useState, useEffect } from "react";

const App = () => {
  const [grid, setGrid] = useState();
  const [lastTurn, setLastTurn] = useState();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < 7; i++) {
      const row = new Array(6).fill(0);
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (!lastTurn) return;
    const winningTokens = evaluateTurn(lastTurn, grid);
    if (winningTokens) {
      console.log("Winner!", winningTokens);
      setActive(false);
      highlightWin(winningTokens, grid);
    }
  }, [lastTurn]);

  const highlightWin = (winningCoords, grid) => {
    const updatedGrid = [...grid];
    for (const [col, row] of winningCoords) {
      updatedGrid[col][row] += " win";
    }
    setGrid(updatedGrid);
    console.log(updatedGrid);
  };

  const evaluateTurn = (turnCoords, grid) => {
    const [col, row] = turnCoords;
    const color = grid[col][row];

    const isWinningStreak = (streak) => streak.length === 4;

    const getMax = (current, max) => {
      return current.length > max.length ? current : max;
    };

    // Check vertical win
    let streak = [];
    let maxVerticalStreak = [];
    const targetColumn = grid[col];
    for (let row = 0; row < targetColumn.length; row++) {
      if (targetColumn[row] === color) {
        streak.push([col, row]);
      } else {
        maxVerticalStreak = getMax(streak, maxVerticalStreak);
        streak = [];
      }
    }
    maxVerticalStreak = getMax(streak, maxVerticalStreak);

    if (isWinningStreak(maxVerticalStreak)) return maxVerticalStreak;

    // Check horizontal win
    streak = [];
    let maxHorizontalStreak = [];
    const targetRow = [];
    for (const column of grid) {
      targetRow.push(column[row]);
    }
    for (let col = 0; col < targetRow.length; col++) {
      if (targetRow[col] === color) {
        streak.push([col, row]);
      } else {
        maxHorizontalStreak = getMax(streak, maxHorizontalStreak);
        streak = [];
      }
    }
    maxHorizontalStreak = getMax(streak, maxHorizontalStreak);

    if (isWinningStreak(maxHorizontalStreak)) return maxHorizontalStreak;
  };

  const handleClick = (playerId, column, grid) => {
    const color = !playerId ? "red" : "yellow";
    const updatedColumn = [...grid[column]].reverse();
    let nextAvailableIdx = updatedColumn.indexOf(0);
    if (nextAvailableIdx === -1) return false;
    nextAvailableIdx = 5 - nextAvailableIdx;
    updatedColumn.reverse();
    updatedColumn.splice(nextAvailableIdx, 1, color);
    const updatedGrid = [...grid];
    updatedGrid.splice(column, 1, updatedColumn);
    setGrid(updatedGrid);
    setTurn(!playerId ? 1 : 0);
    setLastTurn([column, nextAvailableIdx]);
    return true;
  };

  const [turn, setTurn] = useState(0);

  return (
    <div className="App">
      <h1>Connect Four</h1>
      <Stage
        grid={grid}
        onClick={(playerId, column) => handleClick(playerId, column, grid)}
        turn={active ? turn : -1}
      />
    </div>
  );
};

export default App;
