const fs = require("fs");
const path = require("path");


exports.deleteImage = (imagePath) => {
  // Ensure the correct path prefix for the new storage folders
  const fullPath = path.join(__dirname, "../public", imagePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Image not found at ${fullPath}:`, err);
      return;
    }

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`Failed to delete image at ${fullPath}:`, err);
      } else {
        console.log(`Successfully deleted image at ${fullPath}`);
      }
    });
  });
};
exports.deleteFile = async (filePath) => {
  filePath = "./" + filePath;

  if (fs.existsSync(filePath)) {
    //check file exist
    await fs.unlinkSync(filePath);
  }
};

(exports.deleteFiles = async (files) => {
  if (files && files.length > 0) {
    let filePath;
    await Promise.all(
      files.map(async (file) => {
        filePath = "./" + file.path;
        if (fs.existsSync(filePath)) {
          //check file exist
          await fs.unlinkSync(filePath);
        }
      })
    );
  }
}),
  (exports.uniqueFilename = async (file) => {
    let uniqueName = "";
    if (file) {
      uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`; //for i.e 3746674586-836534453.png
    }
    return uniqueName;
  });

exports.convertFilePathSlashes = (path) => {
  let filePath = path.replace(/\\/g, "/");
  return filePath;
};