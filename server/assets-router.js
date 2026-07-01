// The assets-router.js file defines routes for serving static assets such as images and videos. It uses regular expressions to match requests for specific file types and redirects them to the appropriate location on the frontend server. This allows the backend to handle asset requests without directly serving the files, which can be beneficial for performance and security.
const express = require("express");
const router = express.Router();
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
const videoRegex = /\/.+\.(mp4|ogv)$/

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
});

module.exports = router;
