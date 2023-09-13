const { Upload } = require("@aws-sdk/lib-storage"),
  { S3 } = require("@aws-sdk/client-s3");

exports.s3Uploadv2 = async (req, res) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}-${req.file.originalname}`,
    Body: req.file.buffer,
  };

  try {
    const result = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
    return res.json({ files: result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
