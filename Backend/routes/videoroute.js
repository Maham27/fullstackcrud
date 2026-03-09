const router = require("express").Router();
const upload = require("../middleware/video");
const { createvideo, getallvideos, updatevideo, deletevideo } = require("../controllers/videoController");

router.post("/subjects/:subjectid/videos", upload.single("video"), createvideo);
router.get("/subjects/:subjectid/videos", getallvideos);
router.put('/subjects/:id/videos/:videoId', upload.single('video'), updatevideo);
router.delete("/subjects/:id/videos/:videoId", deletevideo);

module.exports = router;