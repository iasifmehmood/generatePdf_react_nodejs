const multer = require('multer');
let fs = require('fs-extra');

/*
@File_Storage:
    Description:                      will create path to store document and gives original document name and format 
*/

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = './files';
    // console.log(file);
    fs.mkdirsSync(path);
    cb(null, path);
  },

  filename: async (req, file, cb) => {
    cb(null, file.fieldname + '-' + file.originalname);
  },
});

/*
@File_Filter:
    Description:                      will filter documents (documents should contain specified format only) 
*/

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    // console.log(file);
    // console.log('pdf');
    const filePath = './files/file-' + file.originalname;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, err => {
      if (err) {
        // File does not exist, allow the upload
        // console.log('does not exist');
        cb(null, true);
      } else {
        // File already exists, reject the upload
        // console.log('already exists');
        req.fileExists = file.originalname;

        cb(null, false);
        return cb(new Error('file already exists'), req.fileExists);
      }
    });
    // cb(null, true);
  } else {
    // console.log("other files are not allowed");
    // req.fileTypeCheck = file.mimetype;

    req.fileExtensionCheck = file.originalname.split('.').pop();

    cb(null, false);
    return cb(new Error('only pdf allow'), req.fileExtensionCheck);
  }
};
