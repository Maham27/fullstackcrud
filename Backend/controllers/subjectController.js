const Subject = require("../model/subject");
const Video = require("../model/video");

const createsubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getallsubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getsubjectbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id, {
      include: [{ model: Video, as: "videos" }]
    });
    if (!subject) {
      return res.status(404).json({ message:"subject not found" });
    }
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatesubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message:"subject not found" });
    }
    await subject.update({ name });
    res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deletesubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message:"subject not found" });
    }
    await subject.destroy();
    res.status(200).json({ message: "subject deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {createsubject,getallsubjects,getsubjectbyid,updatesubject,deletesubject};