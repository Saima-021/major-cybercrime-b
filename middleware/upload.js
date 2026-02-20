const multer = require('multer');
const path = require('path');

// 1. Define WHERE to save and HOW to name the files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure you create an 'uploads' folder in your backend!
  },
  filename: (req, file, cb) => {
    // We name the file: CurrentTime-OriginalName
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 2. Filter: Only allow images (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (JPG, PNG) are allowed!'));
  }
};

// 3. Initialize Multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

module.exports = upload;