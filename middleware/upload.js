const multer = require("multer");
const { uniqueFilename } = require("../helpers/common");
const fs = require("fs");
const path = require("path");

const folderPaths = {
  banner: {
    desktopImage: "./public/banners/desktop",
    mobileImage: "./public/banners/mobile",
  },
  product: {
   productImage: "./public/products",
  },
  gallery:{
    galleyImage:"./public/gallery"
  }
};

const fileFilter = (req, file, cb) => {
  const validMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/mov",
    "video/avi",
    "video/wmv",
    "video/flv",
  ];

  if (validMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed!"));
  }
};

const dynamicStorage = (entityType) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      let folderPath = folderPaths[entityType];

      if (typeof folderPath === "object") {
        folderPath = folderPath[file.fieldname];
      }

      if (folderPath) {
        const fullPath = path.resolve(folderPath);
        if (!fs.existsSync(fullPath)) {
          fs.mkdirSync(fullPath, { recursive: true });
        }
        cb(null, folderPath);
      } else {
        cb(new Error("Invalid entity type or fieldname"));
      }
    },
    // filename: async (req, file, cb) => {
    //   let filename = await uniqueFilename(file);
    //   if (entityType === "categoryFile" || entityType === "product")
    //     filename = file.originalname;
    //   cb(null, filename);
    // },
    filename: async (req, file, cb) => {
      try {
        let filename = await uniqueFilename(file); 
        cb(null, filename);
      } catch (error) {
        cb(error, null); 
      }
    },
  });
};

const uploadConfigurations = {
  banner: multer({
    storage: dynamicStorage("banner"),
    limits: { fileSize: 10000000 * 5 },
    fileFilter: fileFilter,
  }).fields([
    { name: "desktopImage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),

  product: multer({
    storage: dynamicStorage("product"),
    limits: { fileSize: 10000000 * 5 },
    fileFilter: fileFilter,
  }).single("productImage"),

  gallery: multer({
    storage: dynamicStorage("gallery"),
    limits: { fileSize: 10000000 * 5 },
    fileFilter: fileFilter,
  }).single("galleyImage"),
};

const noImage = multer().none();

module.exports = {
  uploadBannerImg: uploadConfigurations.banner,
  uploadProductImg: uploadConfigurations.product,
  uploadGalleryImg: uploadConfigurations.gallery,
  noImage,
};
