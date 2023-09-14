require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { s3Uploadv2, getObjectsOfUser, getSignedUrl, getPreSignedUrl, downloadFile } = require("./s3service");
const cors = require("cors"); // Import the cors middleware

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

// Use the cors middleware and configure it to allow any origin (*)
app.use(cors());

app.post("/upload", upload.single("file"), async (req, res) => {
  const folder = req.query.user || "";
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  if (!req.query.user) {
    return res.status(400).json({ message: "No user specified" });
  }
  try {
    const file = await s3Uploadv2(req, res, folder);
    return res.json({ status: "success", file: file });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/folders", async (req, res) => {
  try {
    const files = await getBucketFolders(req, res);
    return res.json({ status: "success", files: files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/files", async (req, res) => {
  const user = req.query.user || "";
  try {
    const files = await getObjectsOfUser(req, res, user);
    const fileNames = files.map((file) => {
      const parts = file.Key.split("-");
      return parts[parts.length - 1];
    });
    files.forEach((file, index) => {
      file.name = fileNames[index];
    });
    return res.json({ status: "success", files: files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/download", async (req, res) => {
  try {
    await downloadFile(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(500).json({ message: "File size too large" });
  }
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(4000, () => {
  console.log("Running...");
});
