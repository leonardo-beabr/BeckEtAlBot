//Variables of the system
const express = require('express');

//Functions created
const Slack = require('./components/Slack/SlackFunctions')
//Create a router from express;
const routes = express.Router();

//GET

//POST
routes.post('/slackMessages/:path', Slack.SlackMessages)

module.exports = routes;