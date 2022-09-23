import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setInterval(() => setLoaded(true), 1000);
  }, []);

  if (!loaded) return <img src={logo} className="App-logo" alt="logo" />;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {["Add", "Plus", "Increase"].map((title) => (
        <Button title={title} />
      ))}
    </div>
  );
}

export default App;
