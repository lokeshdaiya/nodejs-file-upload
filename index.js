var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();

var DIR = './uploads/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {    
    //var ext = file.mimetype.split('/')[1];
     cb(null, Date.now() + ` -${file.originalname}`);
  }
});

var upload = multer({
  // dest: DIR,
  // filename: function(req, file, cb){
  //    cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
  // }
  storage: storage
}).single('photo');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(multer({
//   dest: DIR,
//   rename: function (fieldname, filename) {
//     return filename + Date.now();
//   },
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...');
//   },
//   onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path);
//   }
// }));

app.get('/api', function (req, res) {
  res.end('file catcher example');
});

app.post('/api', function (req, res) {
  console.log('in post');
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }
     res.json({message: 'File is uploaded'})
    // res.end('');
  });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});