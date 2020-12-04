import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pokemon from "./components/pokemon/Pokemon";

function App() {
  return (
    <div className="App">
      <main className="container-fluid">
        <Pokemon />
      </main>
    </div>
  );
}

export default App;
