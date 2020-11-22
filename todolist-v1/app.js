const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {getDate, getDay} = require(__dirname + '/date.js');
const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const day = getDate();
    res.render('list', {title: day, items});
});

app.get("/work", (req, res) => {
    res.render('list', {title: "Work list", items: workItems});
});

app.post("/", (req, res) => {
    if(req.body.list === "Work list") {
        workItems.push(req.body.todo);
        res.redirect("/work");
    } else {
        items.push(req.body.todo);
        res.redirect("/");
    }
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});