import React, { useState } from "react";
import MyEditor from "./components/Editor";
import GlobalStyles from "./components/style/GlobalStyle.styled";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <MyEditor />
    </div>
  );
};

export default App;
