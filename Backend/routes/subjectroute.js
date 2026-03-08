const express = require("express");
const router = express.Router();
const { createSubject ,getSubjects,getSubjectById,updateSubject,deleteSubject} = require("../controllers/subjectController");

router.post("/subjects", (req, res, next) => {
	console.log("POST /api/subjects hit");
	createSubject(req, res, next);
});
router.get("/subjects", (req, res, next) => {
	console.log("GET /api/subjects hit");
	getSubjects(req, res, next);
});
router.get("/subjects/:id", (req, res, next) => {
	console.log(`GET /api/subjects/${req.params.id} hit`);
	getSubjectById(req, res, next);
});
router.put("/subjects/:id",updateSubject);
router.delete("/subjects/:id",deleteSubject);

module.exports = router;