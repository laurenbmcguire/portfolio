import ImageLoader from "./scripts/imageLoader/imageLoader.js";
import "./App.css";
function App() {
  return (
      <div className="header">
    <div className="center">
      <h1 className="title">Text Hacker</h1>
      <div>
        <ImageLoader />
      </div>
    </div>
      </div>
  );
}

export default App;
