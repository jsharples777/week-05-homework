/* base server for the application */
const {ServerDataModel} = require ("./data/ServerDataModel");
const express = require('express');
const {Logger} = require("./util/Logger");






const app = express();


/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

const dataModel = new ServerDataModel(app);

app.listen(3000,()=> {
   Logger.log("Server started on port 3000",1);
});
