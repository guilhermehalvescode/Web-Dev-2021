const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("<h1>Hello, World!</h1>");
});

app.get('/contact', (req, res) => {
    res.send('guilherme.092011@hotmail.com');
});

app.get('/about', (req, res) => {
    res.send('Hello my name is guilherme and i\'m a programmer');
});



app.listen(3000, () => {
    console.log('Server started on port 3000');
});
