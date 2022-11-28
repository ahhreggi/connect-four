import "./Stage.scss";
import Board from "./Board";
import PropTypes from "prop-types";

const Stage = ({ ...props }) => {
  Stage.propTypes = {
    isActive: PropTypes.bool,
    onReset: PropTypes.func
  };
  return (
    <div className="Stage">
      <h1>Connect Four</h1>
      <Board {...props} />
      <div className="reset-wrapper">
        <div className={`reset ${!props.isActive ? "active" : ""}`} onClick={() => props.onReset()}>
          reset game
        </div>
      </div>
    </div>
  );
};

export default Stage;
