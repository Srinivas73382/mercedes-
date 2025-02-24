import axios from "axios";
import { useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOcrResult(response.data);
      setError("");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error processing image.");
      setOcrResult(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {ocrResult && (
        <div>
          <h3>Extracted Details</h3>
          <p><strong>Bank Name:</strong> {ocrResult.bank_name || "Not found"}</p>
          <p><strong>Card Number:</strong> {ocrResult.card_number || "Not found"}</p>
          <p><strong>Expiry Date:</strong> {ocrResult.valid_thru || "Not found"}</p>
          <p><strong>Cardholder Name:</strong> {ocrResult.cardholder_name || "Not found"}</p>
          <p><strong>Full OCR Text:</strong> {ocrResult.full_text}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
