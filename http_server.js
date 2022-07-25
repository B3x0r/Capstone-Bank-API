var express = require("express");
var path = require ("path");
var app = express();
var cors = require("cors");
var dal = require("./dal-api.js");
app.use(cors({ origin: process.env.PORT || "http://localhost:8080" }));

app.use(express.static(path.join(path.resolve(), "build")));

//create user account
app.get("/account/create/:name/:email/:password", function (req, res) {
  //else create user
  dal
    .createUser(req.params)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
    res.send({ success: false })
  });
});

//login user
app.get("/account/login/:email/:password/", function (req, res) {
  dal
    .verifyUser(req.params)
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.send({ success: false });
    });
});

//balance
app.get("/account/balance/:email/:balance/", function (req, res) {
  dal
    .updateBalance(req.params)
    .then((result) => {
      res.send(result);
    })
    .catch(() => {
      res.send({ success: false });
    });
});

// all accounts
app.get("/account/all", function (req, res) {
  dal
  .all()
  .then((docs) => {
    res.send(docs);
  })
  .catch(() => {
    res.send({ success: false });
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Running on port: " + port);
