const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("./src/database/conn");
const app = express();
const port = 8000;
const router = require("./src/api/routes");

app.use(express.json());
app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));

// Routing
app.use(router);

const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  return res
    .status(error.status ? error.status : 200)
    .json({
      message: error.message,
      status: error.status,
    });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`connection is successful at ${port}`);
});
