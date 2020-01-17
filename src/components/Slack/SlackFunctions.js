var SlackBot = require('slackbots');
const axios = require('axios')
require('dotenv').config()
module.exports = {
    /*
        Maybe add a type param in the function to use it in more channels
        or with direct messages
        Or like a StartBot, then will need to use slackbots to monitoring the channels
    */
    NotifyUser(type  = String, params = {'janitors' : Array, 'birthdays': Array}){
        var slackParams = {
            icon_emoji: ':robot_face:'
        };
        if(type === 'everdayMessage'){
            let randomMessage =  Math.floor((Math.random() * 2) + 1);
            let randomEmoji = Math.floor((Math.random() * 5) + 1);
            //Set a array of emojis http://emoji-cheat-sheet.com/
            const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
            //const enMessage = `The janitors of this week are ${users[0]['Name']} and ${users[1]['Name']} from ${users[0]['Start']} to ${users[0]['End']}`
            //Array of messages that the App will send for the channel
            let ptMessage = [
                `Os zeladores são ${params['janitors'][0]['Name']} e ${params['janitors'][1]['Name']}`//,
                //`O time da zeladoria nesta semana é composta por ${users[0]['Name']} e ${users[1]['Name']}`,
                //`Hoje quem entra em campo para cuidar da zeladoria é o ${users[0]['Name']} e o ${users[1]['Name']}`,
                //`A escalação do Dream Team da Zeladoria é: `
            ]
            if(params['birthdays'].length != 0){
                ptMessage[0] = ptMessage[0] + ' ' + emojiList[randomEmoji] + ` e o aniversariante do dia é o :tada: ${params['birthdays'][0]['Name']} :tada:`
            }
            var bot = new SlackBot({
                token: process.env.BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
                name: process.env.BOT_NAME
            }); 
            bot.postMessage('DSH3K8AF3', ptMessage[0], slackParams);
        }
        //If will be used the slackbots its will be needed the ID of the channel
        // create a bot
        //console.log(params)
        // if(type === 'everdayMessage'){
        //     let randomMessage =  Math.floor((Math.random() * 2) + 1);
        //     let randomEmoji = Math.floor((Math.random() * 5) + 1);
        //     //Set a array of emojis http://emoji-cheat-sheet.com/
        //     const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
        //     //const enMessage = `The janitors of this week are ${users[0]['Name']} and ${users[1]['Name']} from ${users[0]['Start']} to ${users[0]['End']}`
        //     //Array of messages that the App will send for the channel
        //     let ptMessage = [
        //         `Os zeladores são ${params['janitors'][0]['Name']} e ${params['janitors'][1]['Name']}`,
        //         //`O time da zeladoria nesta semana é composta por ${users[0]['Name']} e ${users[1]['Name']}`,
        //         //`Hoje quem entra em campo para cuidar da zeladoria é o ${users[0]['Name']} e o ${users[1]['Name']}`,
        //         //`A escalação do Dream Team da Zeladoria é: `
        //     ]
        //     if(params['birthdays'].length != 0){
        //         ptMessage[0] = ptMessage[0] + ' ' + emojiList[randomEmoji] + ` e o aniversariante do dia é o :tada: ${params['birthdays'][0]['Name']} :tada:`
        //     }
        //     //For webhooks this variables is necessary
        //     const webHook = process.env.WEB_HOOK
        //     //Using the metod post in the webhook
        //     axios.post(
        //         webHook,
        //         {
        //             "blocks":[ //using blocks like block kit builder https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22Danny%20Torrence%20left%20the%20following%20review%20for%20your%20property%3A%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22block_id%22%3A%22section567%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22%3Chttps%3A%2F%2Fexample.com%7COverlook%20Hotel%3E%20%5Cn%20%3Astar%3A%20%5Cn%20Doors%20had%20too%20many%20axe%20holes%2C%20guest%20in%20room%20237%20was%20far%20too%20rowdy%2C%20whole%20place%20felt%20stuck%20in%20the%201920s.%22%7D%2C%22accessory%22%3A%7B%22type%22%3A%22image%22%2C%22image_url%22%3A%22https%3A%2F%2Fis5-ssl.mzstatic.com%2Fimage%2Fthumb%2FPurple3%2Fv4%2Fd3%2F72%2F5c%2Fd3725c8f-c642-5d69-1904-aa36e4297885%2Fsource%2F256x256bb.jpg%22%2C%22alt_text%22%3A%22Haunted%20hotel%20image%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22block_id%22%3A%22section789%22%2C%22fields%22%3A%5B%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Average%20Rating*%5Cn1.0%22%7D%5D%7D%2C%7B%22type%22%3A%22actions%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Reply%20to%20review%22%2C%22emoji%22%3Afalse%7D%7D%5D%7D%5D
        //                 {
        //                     "type": "section",
        //                     "text": {
        //                         "type": "mrkdwn",
        //                         "text": `${ptMessage[0]}`
        //                     }
        //                 },
        //                 // {
        //                 //     "type": "section",
        //                 //     "fields": [
        //                 //         {
        //                 //             "type": "plain_text",
        //                 //             "text": "Trocar a sacola de lixo se estiver cheia;",
        //                 //             "emoji": true
        //                 //         },
        //                 //         {
        //                 //             "type": "plain_text",
        //                 //             "text": "Colocar papéis higiênicos;",
        //                 //             "emoji": true
        //                 //         },
        //                 //         {
        //                 //             "type": "plain_text",
        //                 //             "text": "Verificar a lava louças (retirar a louça limpa, ligar a máquina);",
        //                 //             "emoji": true
        //                 //         },
        //                 //         {
        //                 //             "type": "plain_text",
        //                 //             "text": "Manter a cozinha organizada;",
        //                 //             "emoji": true
        //                 //         },
        //                 //         {
        //                 //             "type": "plain_text",
        //                 //             "text": "Reabastecer as cápsulas de :coffee: e os pacotes de açucar;",
        //                 //             "emoji": true
        //                 //         }
        //                 //     ]
        //                 // }
        //             ]
        //         }
        //     )
        // }
    }
}