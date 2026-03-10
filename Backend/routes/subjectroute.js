const express = require("express");
const router = express.Router();
const { createsubject, getallsubjects, getsubjectbyid, updatesubject, deletesubject } = require("../controllers/subjectController");

router.post("/subjects", createsubject);
router.get("/subjects", getallsubjects);
router.get("/subjects/:id", getsubjectbyid);
router.put("/subjects/:id", updatesubject);
router.delete("/subjects/:id", deletesubject);

module.exports = router;