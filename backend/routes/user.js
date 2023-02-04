const express = require("express");
const router = express.Router();
const {getallusers,usersignin,login} = require("../controllers/userc")

router.get("/",getallusers);
router.post("/signup",usersignin);
router.post("/login",login);

module.exports = router;