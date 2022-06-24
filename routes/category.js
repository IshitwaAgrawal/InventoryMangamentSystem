const express = require("express");
const router = express();
const create = require("../controller/category.js");
const view = require("../controller/category.js");
const update = require("../controller/category");
const remove = require("../controller/category.js");
const bodyparser = require("body-parser");

router.use(bodyparser.json());
router.post("/create", create.create);
router.get("/view", view.view);
router.patch("/:id", update.update);
router.delete("/delete/:id", remove.remove);

module.exports = router;
