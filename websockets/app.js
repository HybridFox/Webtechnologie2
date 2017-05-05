const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const albumRouter = require("./routes/album");

mongoose.connect(config.db);

albumRouter(app);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
});