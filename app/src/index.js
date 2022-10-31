const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PORT } = require("./config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");
const discussionRoutes = require("./routes/discussion.route");

const app = express();


app.use(express.json());
app.use(
  cors()
);


app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// routes middlewares
app.use("/discussion", discussionRoutes);


// api not found error handling  middleware
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
