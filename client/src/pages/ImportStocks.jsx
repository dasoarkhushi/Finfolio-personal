import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const ImportStocks = () => {
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpload = async () => {
    if (!file || !user?.email) {
      alert("Please select a file and be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", user.email);

    try {
      const res = await fetch("http://localhost:5000/api/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        localStorage.setItem("portfolio-updated", Date.now());
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h6">Import Your Stocks</Typography>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" onClick={handleUpload} style={{ marginTop: "1rem" }}>
        Upload
      </Button>
    </div>
  );
};

export default ImportStocks;
