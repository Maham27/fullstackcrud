const router = require("express").Router();
const upload = require("../middleware/video");
const { createVideo, getVideos, updateVideo , deleteVideo } = require("../controllers/videoController");
router.post(
  "/subjects/:subjectid/videos",
  upload.single('video'),  // 'video' = Angular form input ka name
  (req, res, next) => {
    console.log("POST /api/subjects/:subjectid/videos hit");
    createVideo(req, res, next);
  }
);

router.get("/subjects/:subjectid/videos", (req, res, next) => {
    console.log("GET /api/subjects/:subjectid/videos hit");
    getVideos(req, res, next);
});

router.put(
  '/subjects/:id/videos/:videoId',
  upload.single('video'), // 'video' = file input ka name
  (req, res, next) => {
    console.log('PUT /api/subjects/:id/videos/:videoId hit');
    updateVideo(req, res, next);
  }
);

router.delete("/subjects/:id/videos/:videoId", (req, res, next) => {
    console.log("DELETE /api/subjects/:id/videos/:videoId hit");
    deleteVideo(req, res, next);
});


module.exports = router;