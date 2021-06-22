/* base server for the application */
const {ServerDataModel} = require ("./data/ServerDataModel");
const express = require('express');
const {logger} = require("./util/SimpleDebug");






const app = express();




/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

const dataModel = new ServerDataModel(app);

app.listen(3000,()=> {
   logger.log("Server started on port 3000",1);
});
