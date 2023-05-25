const express = require('express');
const {
  loadPdf,
  generatePdf,
  downloadPdf,
} = require('../controller/pdfController.js');
const userRouter = express.Router();

userRouter.get('/loadPdf', loadPdf);
userRouter.post('/generatePdf', generatePdf);
module.exports = userRouter;
