const express = require("express");
const app = express();
const port = 4000;

var route = require("./routes.js");
app.use("/",route);

app.listen(port,function() {
    console.log("Server started on "+port);
});
