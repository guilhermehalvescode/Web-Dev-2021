const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const {id, apiKey} = require(__dirname + '/keys.js');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '/public');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req ,res) => {
    
    const {fname, lname, email} = req.body;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const JSONdata = JSON.stringify(data);
    const url = 'https://us2.api.mailchimp.com/3.0/lists/' + id;
    const options = {
        method: "POST", 
        auth: "guilhermealvesc:" + apiKey,
    } 
    const request = https.request(url, options, response => {
        if(response.statusCode === 200) 
            res.sendFile(__dirname + "/success.html");
        else 
            res.sendFile(__dirname + "/failure.html");
        response.on("data", data => {
            console.log(JSON.parse(data));
        });
    });
    request.write(JSONdata);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server is up on port 3000!");
});