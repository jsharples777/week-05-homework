/* base server for the application */
const express = require('express');
const app = express();

/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

app.listen(3000,()=> {
   console.log("Server started on port 3000");
});
