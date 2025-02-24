// App.jsx
import React from "react";
import "./App.css";  // Import the CSS file
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="container">
      <h1 className="title">OCR Image Upload Demo</h1>
      <ImageUpload />
    </div>
  );
}

export default App;
