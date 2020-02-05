var SlackBot = require('slackbots');
const axios = require('axios')
require('dotenv').config()
const bot = new SlackBot({
    token: process.env.BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: process.env.BOT_NAME
}); 
let slackParams = {
    'icon_emoji': ':robot_face:',
    'blocks': []
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
    EverydayNotify(params = {'janitors': "", 'birthdays': "", 'weather': ""}){
        // console.log(params)
        slackParams['blocks'] = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": params['weather']['phrase']
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": params['janitors']
                }
            }
        ]
        if(params['birthdays'].length !== 0){
            slackParams['blocks'].push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": params['birthdays']
                }
            })
        }
        // console.log(slackParams)
        // bot.postMessage('DSH3K8AF3', '', slackParams);
        bot.postMessage(process.env.CHANNEL, '', slackParams)
    },
    ErrorNotify(error){
        console.log(error)
        bot.postMessage('DSH3K8AF3', `Error: ${error}`, slackParams);
    },
    SlackMessages(req, res){
        if(req['params']['path'] === 'info'){
            res.send('infoRoute')
        }
        if(req['params']['path'] === 'message'){
            if(!req['body']['channel']){
                res.send("channel id is required")
            }
            else{
                let channel = req['body']['channel'];
                let message = req['body']['message'];
                slackParams['blocks'].push({
                    'type':'section',
                    'text': {
                        'type':'mrkdwn',
                        'text': message
                    }
                })
                if(req['body']['blocks']){
                    for(let i = 0; i < req['body']['blocks'].length;i++){
                        slackParams['blocks'].push(req['body']['blocks'][i])
                    }
                }
                bot.postMessage(channel, '', slackParams)
                res.send('Message Sended')
            }
        }
        else{
            res.send("Not found")
        }
    }
}