const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

app.post('/', (req, res) => {
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const sum = num1 + num2; 
    res.send('The result of the sum is ' + sum);
});


app.get('/bmicalculator', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    const result = Math.round(weight / (height * height));
    res.send('Your BMI is ' + result);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});