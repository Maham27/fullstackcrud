const express = require("express");
const router = express.Router();
const { createuser, loginuser } = require('../controllers/authContoller')

router.post('/registration', createuser);
router.post('/login', loginuser);

module.exports = router;
