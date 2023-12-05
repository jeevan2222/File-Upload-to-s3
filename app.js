const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const port = 1234;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s3 = new AWS.S3({
  accessKeyId: "AKIARGPOVCNPCRIWX77O",
  secretAccessKey: "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",
});

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  console.log("req", req.file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limiting file size to 5MB
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.send("Hi :)");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const params = {
    Bucket: "mybucketjeevan591",
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.upload(params).promise();
    res.status(200).send("File uploaded to S3 successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file to S3");
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
