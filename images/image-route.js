const router = require('express').Router();
const aws = require('aws-sdk');
const restricted = require('../routers/auth/restricted-middleware');

aws.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});
router.post('/signed-url', restricted, (req, res) => {
  const s3 = new aws.S3();
  const { filename, filetype } = req.body;
  //validation
  const s3Params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Expires: 500,
    ContentType: filetype,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    } else {
      const returnData = {
        signedRequest: data,
        url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      // Send it all back
      return res.status(200).json({ success: true, data: { returnData } });
    }
  });
});

module.exports = router;
