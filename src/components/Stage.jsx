import "./Stage.scss";
import Board from "./Board";
import PropTypes from "prop-types";

const Stage = ({ onReset, ...props }) => {
  Stage.propTypes = {
    onReset: PropTypes.func
  };
  return (
    <div className="Stage">
      <a href="https://github.com/ahhreggi/connect-four" target="_blank" rel="noreferrer">
        <h1>Connect Four</h1>
      </a>
      <Board {...props} />
      <div className="reset-wrapper">
        <div className="reset" onClick={() => onReset()}>
          reset game
        </div>
      </div>
    </div>
  );
};

export default Stage;
