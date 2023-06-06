const express = require('express');
const {
  loadPdf,
  generatePdf,
  downloadPdf,
} = require('../controller/pdfController.js');
const { fileUpload } = require('../controller/pdfUploadController.js');
const userRouter = express.Router();

userRouter.get('/loadPdf', loadPdf);
userRouter.post('/generatePdf', generatePdf);
userRouter.post('/upload', fileUpload);
module.exports = userRouter;
