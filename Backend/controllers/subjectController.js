const Subject = require("../model/subject");


exports.createSubject = async (req, res) => {
  try {
    const { name} = req.body;
    const subject = await Subject.create({ name});
    res.status(201).json({ success: true, subject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};