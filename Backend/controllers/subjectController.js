const Subject = require("../model/subject");
const Video = require("../model/video");


const createsubject = async (req, res) => {
   console.log(req.body); 
  try {
    const { name} = req.body;
    const subject = await Subject.create({ name});
    res.status(201).json(subject );
  } catch (error) {
     console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const getallsubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
    console.log(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getsubjectbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id, {
      include: [{ model: Video, as: 'videos' }] 
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatesubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    await subject.update({ name });
    res.status(200).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deletesubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    await subject.destroy();
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createsubject,getallsubjects,getsubjectbyid,updatesubject,deletesubject};