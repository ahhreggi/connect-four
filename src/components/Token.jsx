import "./Token.scss";
import PropTypes from "prop-types";

const Token = ({ color }) => {
  Token.propTypes = {
    color: PropTypes.string
  };
  return <div className={`Token bg-${color}`}></div>;
};

export default Token;
