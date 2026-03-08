const Video = require("../model").Video;
const Subject = require("../model").Subject;

exports.createVideo = async (req, res) => {
  try {
    const { title} = req.body;
    const subjectId = req.params.subjectid;
     if (!req.file) {                     // multer file check
      return res.status(400).json({ message: 'Video file is required' });
    }
    const url = `/uploads/videos/${req.file.filename}`;
    const video = await Video.create({ title, url, subjectId });
    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {

    const subjectId = req.params.subjectid;

    const videos = await Video.findAll({
      where: { subjectId: subjectId },
      include: [{ model: Subject, as: "subject" }]
    });

    res.status(200).json(videos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const subjectId = req.params.id;      // /subject/:id/
    const videoId = req.params.videoId;   // /subject/:id/video/:videoId
    const { title } = req.body;           // url will come from uploaded file

    // Find video by id AND subjectId to ensure it belongs to this subject
    const video = await Video.findOne({ 
      where: { 
        id: videoId, 
        subjectId: subjectId 
      } 
    });

    if (!video) return res.status(404).json({ message: 'Video not found for this subject' });

    // Agar file upload hui ho, URL update karo
    let videoUrl = video.url; // existing URL
    if (req.file) {
      videoUrl = '/uploads/videos/' + req.file.filename;
    }

    // Update video title and url
    await video.update({ title, url: videoUrl });

    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {

    const videoId = req.params.videoId;

    const video = await Video.findByPk(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();

    res.json({ message: "Video deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};