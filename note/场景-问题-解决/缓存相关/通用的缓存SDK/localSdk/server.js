const express = require('express')
const path = require('path')
let app = express()
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./view/index.html"));
});

let server = app.listen(3000, function () {
})