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
    EverydayNotify(params = {'janitors' : Array, 'birthdays': Array}){
        console.log(params)
        let currentJanitorPhrase = '', currentBirthdayPhrase = ''
        let janitorPhrases = {
            'portuguese': [`Os zeladores são ${params['janitors'][0]['Name']} e ${params['janitors'][1]['Name']}`],
            'english': [],
            'spanish': [],
            'german': []
        }
        let birthdaysPhrases = {
            'portuguese': [`Os zeladores são ${params['janitors'][0]['Name']} e ${params['janitors'][1]['Name']}`],
            'english': [],
            'spanish': [],
            'german': []
        }
        function RandomPhrase(janitor, birthday){
            const randomLanguage = Object.keys(janitor)[Math.floor(Math.random() * Object.keys(janitor).length)] 
            currentJanitorPhrase = janitor[randomLanguage][Math.floor(Math.random() * janitor[randomLanguage].length)]
            if(params['birthdays'].length !== 0){
                currentBirthdayPhrase = birthday[randomLanguage][Math.floor(Math.random() * birthday[randomLanguage].length)]
            }
        }
        RandomPhrase(janitorPhrases, birthdaysPhrases)
        //Set a array of emojis http://emoji-cheat-sheet.com/
        const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
        // console.log('Emoji1: ', emojiList[Math.floor(Math.random()*emojiList.length)])
        // console.log('Emoji2: ', emojiList[Math.floor(Math.random()*emojiList.length)])
        //const enMessage = `The janitors of this week are ${users[0]['Name']} and ${users[1]['Name']} from ${users[0]['Start']} to ${users[0]['End']}`
        //Array of messages that the App will send for the channel
        let ptMessage = [
            `Os zeladores são <@${params['janitors'][0]['Slack Id']}> e <@${params['janitors'][1]['Slack Id']}>`//,
            //`O time da zeladoria nesta semana é composta por ${users[0]['Name']} e ${users[1]['Name']}`,
            //`Hoje quem entra em campo para cuidar da zeladoria é o ${users[0]['Name']} e o ${users[1]['Name']}`,
            //`A escalação do Dream Team da Zeladoria é: `
        ]
        if(params['birthdays'].length === 1){
            ptMessage[0] = ptMessage[0]  + ` e o aniversariante do dia é o :tada: ${params['birthdays'][0]['Slack Id']} :tada:`
        }
        if(params['birthdays'].length > 1){
            ptMessage[0] = ptMessage[0] + ' e os anivesariantes do dia são '
            for(let i = 0; i < params['birthdays'].length; i++){
                if(i === params['birthdays'].length - 1){
                    ptMessage[0] = ptMessage[0] + ` e ${params['birthdays'][i]['Name']}`
                }
                else{
                    ptMessage[0] = ptMessage[0] + `${params['birthdays'][i]['Name']}`
                }
            }
        }
        console.log(ptMessage[0])
        // bot.postMessage('DSH3K8AF3', ptMessage[0], slackParams);
        //bot.postMessage(process.env.CHANNEL, ptMessage[0], slackParams)
    },
    ErrorNotify(error){
        console.log(error)
        // bot.postMessage('DSH3K8AF3', error, slackParams);
    }
}