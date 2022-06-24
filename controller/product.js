const Product = require("../models/product");

const create = (req, res, next) => {
  let productName = req.body.proName;
  let categoryId = req.body.catId;
  let product = new Product({
    productName: productName,
    category: categoryId,
  });
  product.save().then((data) => {
    res.send(data);
  });
};

const view = (req, res, next) => {
  Product.find({}).then((data) => {
    res.send(data);
  });
};

const update = (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Error with updating the Product recorded. " });
    }
    res.send(product);
  });
};

const remove = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Error with deleting the product." });
    }
    res.send({ success: " Product is successfully deleted!" });
  });
};

const categoryView = (req, res, next) => {
  Product.find({}).then((data) => {
    const req_data = [];
    data.forEach((d) => {
      if (d["category"] == req.params.catId) {
        req_data.push(d);
      }
    });
    res.send(req_data);
  });
};

module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
module.exports.remove = remove;
module.exports.categoryView = categoryView;
