const Video = require("../model").Video;
const Subject = require("../model").Subject;

const createvideo = async (req, res) => {
  try {
    const { title } = req.body;
    const subjectId = req.params.subjectid;
    if (!req.file) {
      return res.status(400).json({ message: "video file is required" });
    }
    const url = `/uploads/videos/${req.file.filename}`;
    const video = await Video.create({ title, url, subjectId });
    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

const getallvideos = async (req, res) => {
  try {
    const subjectId = req.params.subjectid;
    const videos = await Video.findAll({
      where: { subjectId: subjectId },
      include: [{ model: Subject, as: "subject" }]
    });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message });
  }
};

const updatevideo = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const videoId = req.params.videoId;
    const { title } = req.body;
    const video = await Video.findOne({
      where: {
        id: videoId,
        subjectId: subjectId
      }
    });
    if (!video) return res.status(404).json({ message: "video not found" });
    let videoUrl = video.url;
    if (req.file) {
      videoUrl = '/uploads/videos/' + req.file.filename;
    }
    await video.update({ title, url: videoUrl });
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: err.message });
  }
};
const deletevideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    await video.destroy();
    res.json({ message: "video deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createvideo, getallvideos, updatevideo, deletevideo };