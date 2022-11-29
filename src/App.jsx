import "./App.scss";
import Stage from "./components/Stage";
import { useState, useEffect } from "react";

const App = () => {
  const [grid, setGrid] = useState();
  const [turn, setTurn] = useState(0);
  const [lastTurn, setLastTurn] = useState();
  const [active, setActive] = useState(true);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGrid();
  }, []);

  useEffect(() => {
    if (!lastTurn) return;
    const result = evaluateTurn(lastTurn, grid);
    if (result) {
      const { winningCoords, color } = result;
      setActive(false);
      highlightWin(winningCoords, grid);
      setTurn(color === "first" ? 0 : 1);
    } else if (moves === 42) {
      setActive(false);
    }
  }, [lastTurn]);

  const resetGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 7; i++) {
      const row = new Array(6).fill(0);
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const handleReset = () => {
    setTurn(0);
    setLastTurn(undefined);
    setMoves(0);
    resetGrid();
    setActive(true);
  };

  const highlightWin = (winningCoords, grid) => {
    const updatedGrid = [...grid];
    for (let col = 0; col < updatedGrid.length; col++) {
      for (let row = 0; row < updatedGrid[0].length; row++) {
        if (updatedGrid[col][row]) {
          updatedGrid[col][row] += " dim";
        }
      }
    }
    for (const [col, row] of winningCoords) {
      updatedGrid[col][row] += " win";
    }
    setGrid(updatedGrid);
  };

  const evaluateTurn = (turnCoords, grid) => {
    const [col, row] = turnCoords;
    const color = grid[col][row];

    const isWinningStreak = (streak) => streak.length >= 4;

    const getMax = (current, max) => {
      return current.length > max.length ? current : max;
    };

    const winningStreaks = [];

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

    if (isWinningStreak(maxVerticalStreak)) {
      winningStreaks.push(...maxVerticalStreak);
    }

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

    if (isWinningStreak(maxHorizontalStreak)) {
      winningStreaks.push(...maxHorizontalStreak);
    }

    // Check diagonal win 1
    streak = [];
    let maxDiagonalStreak1 = [];
    const targetDiagonal1 = [[col, row]];
    // Get top left slots
    let dCol1 = col - 1;
    let dRow1 = row - 1;
    while (dCol1 >= 0 && dRow1 >= 0) {
      targetDiagonal1.unshift([dCol1, dRow1]);
      dCol1--;
      dRow1--;
    }
    // Get bottom right slots
    dCol1 = col + 1;
    dRow1 = row + 1;
    while (dCol1 < grid.length && dRow1 < grid[0].length) {
      targetDiagonal1.push([dCol1, dRow1]);
      dCol1++;
      dRow1++;
    }
    // Check if win is possible for this diagonal
    if (targetDiagonal1.length >= 4) {
      for (const [col, row] of targetDiagonal1) {
        if (grid[col][row] === color) {
          streak.push([col, row]);
        } else {
          maxDiagonalStreak1 = getMax(streak, maxDiagonalStreak1);
          streak = [];
        }
      }
      maxDiagonalStreak1 = getMax(streak, maxDiagonalStreak1);

      if (isWinningStreak(maxDiagonalStreak1)) {
        winningStreaks.push(...maxDiagonalStreak1);
      }
    }

    // Check diagonal win 2
    streak = [];
    let maxDiagonalStreak2 = [];
    const targetDiagonal2 = [[col, row]];
    // Get bottom left slots
    let dCol2 = col - 1;
    let dRow2 = row + 1;
    while (dCol2 >= 0 && dRow2 <= grid[0].length) {
      targetDiagonal2.unshift([dCol2, dRow2]);
      dCol2--;
      dRow2++;
    }
    // Get top right slots
    dCol2 = col + 1;
    dRow2 = row - 1;
    while (dCol2 < grid.length && dRow2 >= 0) {
      targetDiagonal2.push([dCol2, dRow2]);
      dCol2++;
      dRow2--;
    }
    // Check if win is possible for this diagonal
    if (targetDiagonal2.length >= 4) {
      for (const [col, row] of targetDiagonal2) {
        if (grid[col][row] === color) {
          streak.push([col, row]);
        } else {
          maxDiagonalStreak2 = getMax(streak, maxDiagonalStreak2);
          streak = [];
        }
      }
      maxDiagonalStreak2 = getMax(streak, maxDiagonalStreak2);

      if (isWinningStreak(maxDiagonalStreak2)) {
        winningStreaks.push(...maxDiagonalStreak2);
      }
    }
    return winningStreaks.length ? { winningCoords: winningStreaks, color } : null;
  };

  const handleClick = (playerId, column, grid) => {
    const color = !playerId ? "first" : "second";
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
    setMoves(moves + 1);
    return true;
  };

  return (
    <div className="App">
      <Stage
        grid={grid}
        onClick={(playerId, column) => handleClick(playerId, column, grid)}
        turn={turn}
        isActive={active}
        onReset={() => handleReset()}
      />
    </div>
  );
};

export default App;
