<<<<<<< HEAD
const axios = require("axios");
const router = require("express").Router();
const aws = require("aws-sdk");
const restricted = require("../routers/auth/restricted-middleware");
const Images = require("../images/images-model");
=======
const axios = require('axios');
const router = require('express').Router();
const aws = require('aws-sdk');
const restricted = require('../routers/auth/restricted-middleware');
const Images = require('../images/images-model');
>>>>>>> 2ab4a3ee957919fe30fc175a2ac2052f62d3fd9e

aws.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

router.post("/signed-url", restricted, (req, res) => {
  const s3 = new aws.S3();
  const { filename, filetype } = req.body;
  //validation
  if (filename && filetype) {
    next();
  } else {
    return res.status(404).json({
      Error: "No Filename & Filetype indicated"
    });
  }
  const s3Params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Expires: 500,
    ContentType: filetype,
    ACL: "public-read"
  };
  s3.getSignedUrl("putObject", s3Params, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    } else {
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${filename}`
      };
      // Send it all back
      return res.status(200).json({ success: true, ...returnData });
    }
  });
});
<<<<<<< HEAD

router.post("/", restricted, (req, res) => {
=======
//Adds Image
router.post('/', restricted, (req, res) => {
>>>>>>> 2ab4a3ee957919fe30fc175a2ac2052f62d3fd9e
  if (!req.body.url) {
    return res.status(400).json({
      message: "Photo URL required"
    });
  }
<<<<<<< HEAD
  Images.add({ user_id: req.session.user }).then(image => {
    res.status(202).json({ message: "Image being analyzed" });
=======
  Images.add({ user_id: req.session.user.id }).then(image => {
    res.status(202).json({ message: 'Image being analyzed' });
>>>>>>> 2ab4a3ee957919fe30fc175a2ac2052f62d3fd9e

    axios
      .post("http://distortedlogic.hopto.org/api", { url: req.body.url })
      .then(response => {
        Images.update(image.id, { data: response.data });
      });
  });
});

module.exports = router;
