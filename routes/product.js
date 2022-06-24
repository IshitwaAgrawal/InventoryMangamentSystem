const router = require("express")();
const create = require("../controller/product.js");
const view = require("../controller/product.js");
const update = require("../controller/product.js");
const remove = require("../controller/product.js");
const categoryView = require("../controller/product.js");
const bodyparser = require("body-parser");

router.use(bodyparser.json());
router.post("/create", create.create);
router.get("/view", view.view);
router.patch("/:id", update.update);
router.delete("/remove/:id", remove.remove);
router.get("/view/:catId", categoryView.categoryView);

module.exports = router;
