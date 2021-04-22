const express = require('express');
const request = require('request');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT);
});

app.get('/', function (req, res) {
    res.send('Ngrok is working! - Path Hit: ' + req.url);
});

app.get('/oauth', function (req, res) {
    if (!req.query.code) {
        res.status(500);
        res.send({ Error: "Looks like we're not getting code." });
        console.log("Looks like we're not getting code");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access',
            qs: {
                code: req.query.code,
                client_id: process.env.SLACK_CLIENT_ID,
                client_secret: process.env.SLACK_CLIENT_SECRET,
                method: 'GET',
            },
            function(error, res, body) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(body);
                }
            },
        });
    }
});

app.post('/command', function (req, res) {
    res.send('Your ngrok tunnel is up and running!');
});
