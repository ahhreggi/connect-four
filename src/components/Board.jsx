import "./Board.scss";
import Token from "./Token";
import PropTypes from "prop-types";

const Board = ({ grid, onClick, turn }) => {
  Board.propTypes = {
    grid: PropTypes.array,
    onClick: PropTypes.func,
    turn: PropTypes.number
  };

  const TokenColumns = ({ grid, onClick }) => {
    TokenColumns.propTypes = {
      grid: PropTypes.array,
      onClick: PropTypes.func
    };

    const handleClick = (column) => {
      const valid = onClick(column);
      if (!valid) {
        console.log("Column full!");
      }
    };

    return (
      <div className="TokenColumns">
        {grid &&
          grid.map((col, i) => {
            return (
              <div className="TokenColumn" key={i} onClick={() => handleClick(i)}>
                {col.map((color, i) => (
                  <Token key={i} color={color || ""} />
                ))}
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className="Board">
      <TokenColumns
        grid={grid}
        onClick={(column) => onClick(turn, column)}
        colors={["red", "yellow"]}
      />
    </div>
  );
};

export default Board;
