import "./Board.scss";
import Token from "./Token";
import PropTypes from "prop-types";

const Board = ({ grid, onClick, turn, isActive }) => {
  Board.propTypes = {
    grid: PropTypes.array,
    onClick: PropTypes.func,
    turn: PropTypes.number,
    isActive: PropTypes.bool
  };

  const TokenColumns = ({ grid, onClick }) => {
    TokenColumns.propTypes = {
      grid: PropTypes.array,
      onClick: PropTypes.func
    };

    const handleClick = (column) => {
      onClick(column);
    };

    return (
      <div className="TokenColumns">
        {grid &&
          grid.map((col, i) => {
            const isDisabled = col[0] || !isActive ? "disabled" : "";
            return (
              <div
                className={`TokenColumn turn-${turn === 0 ? "red" : "yellow"} ${
                  isDisabled ? "disabled" : ""
                }`}
                key={i}
                onClick={() => (isDisabled ? null : handleClick(i))}
              >
                {col.map((color, i) => (
                  <Token key={i} color={color || "empty"} />
                ))}
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className={`Board border-${isActive ? (!turn ? "red" : "yellow") : "white"}`}>
      <TokenColumns grid={grid} onClick={(column) => onClick(turn, column)} />
    </div>
  );
};

export default Board;
