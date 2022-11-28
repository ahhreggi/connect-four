import "./Board.scss";
import Token from "./Token";

const Board = () => {
  const getTokenColor = (id) => {
    switch (id) {
      case 1:
        return "red";
      case 2:
        return "yellow";
      case 0:
      default:
        return "";
    }
  };

  const grid = [];
  for (let i = 0; i < 7; i++) {
    const row = new Array(6).fill(0);
    grid.push(row);
  }
  const TokenColumns = () => {
    return (
      <div className="TokenColumns">
        {grid.map((row, i) => {
          return (
            <div className="TokenColumn" key={i}>
              {row.map((colorId, i) => (
                <Token key={i} color={getTokenColor(colorId)} />
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="Board">
      <TokenColumns />
    </div>
  );
};

export default Board;
