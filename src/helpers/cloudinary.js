const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage.createCloudinaryStorage({
  cloudinary,
  folder: "memorial",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 1000, crop: "fill" }],
});

function parser() {
  return multer({ storage });
}

module.exports = parser;
