const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var fistName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fistName,
        LNAME: lastName,
      }
    }]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us2.api.mailchimp.com/3.0/lists/f801d30da0",
    method: "POST",
    headers: {
      "Authorization": "marwan 4dc597061ced7661351682b77ede9aa5-us2"
    },
    body: jsonData,
  };

  request(options, function(error, response, body) {

    if (error) {
      // There was an error with signing up, contact the developer
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server's running...");
});

// 4dc597061ced7661351682b77ede9aa5-us2
// f801d30da0
