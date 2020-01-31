var SlackBot = require('slackbots');
const axios = require('axios')
require('dotenv').config()
const bot = new SlackBot({
    token: process.env.BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: process.env.BOT_NAME
}); 
var slackParams = {
    'icon_emoji': ':robot_face:',
    // 'blocks': [
    //     {
    //         'type':'section',
    //         'text': {
    //             'type':'mrkdwn',
    //             'text': ptMessage
    //         }
    //     }
    // ]
};
module.exports = {
    /*
        Maybe add a type param in the function to use it in more channels
        or with direct messages
        Or like a StartBot, then will need to use slackbots to monitoring the channels
        Need to check if the current day is equal to the Mon day to show a message like:
        "Os zeladores desta semana são: Nome1 e Nome2" (optional)
        Add auto data select when the all janitors teams gone
        To mention an user => <@User_Id>
    */
    EverydayNotify(params = {'slackMessage': {'text': String, 'blocks': Array}}){
        console.log(params)
        // console.log(slackMessage)
        // bot.postMessage('DSH3K8AF3', ptMessage[0], slackParams);
        bot.postMessage(process.env.CHANNEL, params['slackMessage']['text'], slackParams)
    },
    ErrorNotify(error){
        console.log(error)
        bot.postMessage('DSH3K8AF3', `Error: ${error}`, slackParams);
    }
}