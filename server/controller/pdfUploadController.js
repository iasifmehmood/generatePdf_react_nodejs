const multer = require('multer');
const { fileStorage, fileFilter } = require('../services/fileStorageFilter');
upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single(
  'file'
);

exports.fileUpload = (req, res) => {
  try {
    return upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(400).json({
          status: 'fail',
          message: `Uploading has failed `,
          err,
        });
      } else if (err) {
        // Check if the file with the same name already exists

        if (req.fileExists)
          return res.status(400).json({
            status: 'fail',
            message: `Uploading has failed because ${req.fileExists} file already exists.  `,
            err,
          });
        else if (req.fileExtensionCheck) {
          return res.status(400).json({
            status: 'fail',
            message: `Uploading has failed ( pdf allow). You Uploaded ${req.fileExtensionCheck} file `,
            err,
          });
        }
      }

      return res.status(200).json({
        status: 'success',
        message: 'file is uploaded successfully',
        err,
      });

      // Everything went fine.
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Something unexpected happened',
      error: error,
    });
  }
};
