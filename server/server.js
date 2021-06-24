/* base server for the application */
const {ServerDataModel} = require("./data/ServerDataModel");
const express = require('express');
const {Logger} = require("./util/Logger");
require('dotenv').config();


const app = express();


/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

const dataModel = new ServerDataModel(app);

const port = process.env.PORT;

app.listen(port, () => {
    Logger.log(`Server started on port ${port}`, 1);
});
