// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Stage from "./components/Stage";

const App = () => {
  return (
    <div className="App">
      <h1>Connect Four</h1>
      <Stage />
    </div>
  );
};

export default App;
