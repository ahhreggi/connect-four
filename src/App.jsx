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

    const getMax = (current, max) => {
      return current.length > max.length ? current : max;
    };

    // Check column/vertical win
    let streak = [];
    let maxStreak = [];
    const column = grid[col];
    for (let row = 0; row < column.length; row++) {
      if (column[row] === color) {
        streak.push([col, row]);
      } else {
        maxStreak = getMax(streak, maxStreak);
        streak = [];
      }
    }
    maxStreak = getMax(streak, maxStreak);
    return maxStreak.length === 4 ? maxStreak : false;
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
