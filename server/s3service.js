const uuid = require("uuid").v4;
const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");

exports.s3Uploadv2 = async (req, res, folder) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const key = `${folder}/${uuid()}-${req.file.originalname}`;
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: req.file.buffer,
  };

  try {
    const result = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
  } catch (err) {
    throw new Error("Internal server error");
  }
};

exports.getBucketFolders = async (req, res) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  try {
    const result = await s3.listObjectsV2(
      { Bucket: process.env.AWS_BUCKET_NAME, Delimiter: "/" },
      (err, data) => {
        if (err) {
          console.error("Error listing objects: ", err);
        } else {
          const folders = data.CommonPrefixes.map((prefix) => prefix.Prefix);
          console.log("Folders:", folders);
        }
      }
    );
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
};

exports.getObjectsOfUser = async (req, res, user) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  try {
    const result = await s3.listObjectsV2({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: user,
    });

    const objects = result.Contents;

    return objects;
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
};

exports.downloadFile = async (req, res) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const key = req.query.key;
  console.log("Key:", key);
  try {
    const result = await s3.getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    const fileStream = result.Body;

    res.attachment(key);
    fileStream.pipe(res);
  } catch (err) {
    console.error(err);
    throw new Error("Internal server error");
  }
};
