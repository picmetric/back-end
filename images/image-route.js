const axios = require("axios");
const router = require("express").Router();
const aws = require("aws-sdk");
const restricted = require("../routers/auth/restricted-middleware");
const Images = require("../images/images-model");

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
//Adds Image
router.post("/", restricted, (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({
      message: "Photo URL required"
    });
  }

  axios
    .post("http://ec2-54-144-27-51.compute-1.amazonaws.com/api", {
      url: req.body.url
    })
    .then(response => {
      Images.add({
        user_id: req.session.user.id,
        data: JSON.stringify(response.data)
      }).then(image => {
        res.status(200).json(image);
      });
    });
});

router.get("/", restricted, (req, res) => {
  Images.findByUserId(req.session.user.id)
    .then(images => {
      res.status(200).json(images);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Server error fetching user's images", error });
    });
});

router.get("/:id", restricted, (req, res) => {
  Images.findById(req.params.id)
    .then(image => {
      if (image.user_id !== req.session.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.status(200).json(image);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Server error fetching user's images", error });
    });
});

module.exports = router;
