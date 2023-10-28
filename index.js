const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./routes/post"));
app.use("/api/category", require("./routes/category"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at ${port}`));

module.exports = app;
