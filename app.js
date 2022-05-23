const express = require("express");
const app = express();
const https = require("https");
const request = require("request");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const fn = req.body.fn;
  const ln = req.body.ln;
  const email = req.body.email;
  const data = [ {
                email_address: email,
                Status: "subscribed",
                merge_fields: {
                  FNAME: fn,
                  LNAME: ln
                }
  }
];
const url = "https://us17.api.mailchimp.com/3.0/lists/e6c38380b6";
const jsonData = JSON.stringify(data);
const options = {
  method: "POST",
  auth: "GauravJain9:78800a5bdbf0e428b1fbe8473a1f8d67-us17"
  // headers: {
  //   "Authorization": "GauravJain9 78800a5bdbf0e428b1fbe8473a1f8d67-us17"
  // }
}
const request = https.request(url, options, function(response) {
  response.on("data", function(data) {
      if(data.status === 200)
      res.sendFile(__dirname + "/success.html");
      else
      res.sendFile(__dirname + "/failure.html");
      // console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res) {
  res.redirect("/");
})
app.listen(3000, function() {
  console.log("Server listening on port:3000");
})
