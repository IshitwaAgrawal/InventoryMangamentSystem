const app = require("express")();
const mongoose = require("mongoose");
const category = require("./routes/category");
const product = require("./routes/product");
const PORT = 8080 | process.env.PORT;

mongoose.connect(
  "mongodb+srv://user007:stevejobs21@mydb.fxuqi.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Connected successfully!");
});

app.use("/category", category);
app.use("/product", product);

app.listen(PORT, () => console.log(`Server is up,\nport -> ${PORT}`));
