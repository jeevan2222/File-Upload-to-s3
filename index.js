const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIARGPOVCNPCRIWX77O",
  secretAccessKey: "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",
});

// s3.listBuckets((err, data) => {
//   if (err) {
//     console.error("Error listing buckets:", err);
//   } else {
//     console.log("Buckets:", data.Buckets);
//   }
// });
const params = {
  Bucket: "mybucketjeevan591",
  Key: "example.txt",
  Body: "Hello, this is a sample text file!",
};

s3.upload(params, (err, data) => {
  if (err) {
    console.error("Error uploading file:", err);
  } else {
    console.log("File uploaded successfully:", data.Location);
  }
});
