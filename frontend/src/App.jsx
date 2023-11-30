import "./App.css";
import axios from "axios";
function App() {
  const handleConnection = () => {
    axios.get("/api");
    console.log("connecttion");
  };

  return (
    <>
      <h1>hello</h1>
      <button onClick={handleConnection}>click</button>
    </>
  );
}

export default App;
