import "./Stage.scss";
import Board from "./Board";

const Stage = ({ ...props }) => {
  return (
    <div className="Stage">
      <Board {...props} />
    </div>
  );
};

export default Stage;
