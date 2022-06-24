require("dotenv").config();
const app = require("express")();
const mongoose = require("mongoose");
const category = require("./routes/category");
const product = require("./routes/product");
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_DB_URL);

mongoose.connection.once("open", () => {
  console.log("Connected successfully!");
});

app.use("/category", category);
app.use("/product", product);

app.listen(PORT, () => console.log(`Server is up,\nport -> ${PORT}`));
