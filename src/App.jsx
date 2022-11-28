// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Stage from "./components/Stage";
import { useState, useEffect } from "react";

const App = () => {
  const [grid, setGrid] = useState();

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < 7; i++) {
      const row = new Array(6).fill(0);
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

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
    return true;
  };

  const [turn, setTurn] = useState(0);

  return (
    <div className="App">
      <h1>Connect Four</h1>
      <Stage
        grid={grid}
        onClick={(playerId, column) => handleClick(playerId, column, grid)}
        turn={turn}
      />
    </div>
  );
};

export default App;
