const bodyParser = require("body-parser");
const express = require("express");
const router = express();
const signup = require("../controller/user");
const login = require("../controller/user");
const view = require("../controller/user");
const auth = require("../middleware/auth");

router.use(bodyParser.json());
router.post("/login", login.login);
router.post("/signup", signup.signup);
router.get("/view", auth, view.view);

module.exports = router;
