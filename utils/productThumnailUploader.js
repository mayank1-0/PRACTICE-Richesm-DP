const multer = require('multer');
const path = require('path');

// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // Set the destination directory
    },
    filename: (req, file, cb) => {
        const folderName = "gallery"; // Specify your folder name
        const uniqueSuffix = "thumnail" + Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, path.join(folderName, uniqueSuffix + path.extname(file.originalname))); // Set the folder and image name
    },
  });

  const upload = multer({ storage: storage });

  module.exports = upload