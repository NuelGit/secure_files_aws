require("dotenv").config();
const e = require("express");
const express = require("express");
const multer = require("multer");
const { s3Uploadv2 } = require("./s3service");
const uuid = require("uuid").v4;

const app = express();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuid()}-${file.originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

app.post("/upload", upload.single("file"), async (req, res) => {
  const result = await s3Uploadv2(req);
  return res.json({ status: "success", files: result });
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
