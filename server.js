const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const apiRoutes = require("./routes/api.js");
const connection_url = "mongodb+srv://ivydo:796!AQnp-ZjXuT2@cluster0.quy5e.mongodb.net/budgetDB"

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/budget" || connection_url;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
