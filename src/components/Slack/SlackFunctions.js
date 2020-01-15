//var SlackBot = require('slackbots');
const axios = require('axios')

module.exports = {
    NotifyUser(users = Array){
        const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
        let randomMessage =  Math.floor((Math.random() * 2) + 1);
        let randomEmoji = Math.floor((Math.random() * 5) + 1);
        const enMessage = `The janitors of this week are ${users[0]['Name']} and ${users[1]['Name']} from ${users[0]['Start']} to ${users[0]['End']}`
        const ptMessage = [
            `Os zeladores desta semana são ${users[0]['Name']} e ${users[1]['Name']}`,
            `O time da zeladoria nesta semana é composta por ${users[0]['Name']} e ${users[1]['Name']}`,
            `Hoje quem entra em campo para cuidar da zeladoria é o ${users[0]['Name']} e o ${users[1]['Name']}`,
            `A escalação do Dream Team da Zeladoria é: `
        ]
        axios.post(
            "https://hooks.slack.com/services/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",
            {
                "blocks":[
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${ptMessage[0]} ${emojiList[randomEmoji]}`
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "plain_text",
                                "text": "Trocar a sacola de lixo se estiver cheia;",
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": "Colocar papéis higiênicos;",
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": "Verificar a lava louças (retirar a louça limpa, ligar a máquina);",
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": "Manter a cozinha organizada;",
                                "emoji": true
                            },
                            {
                                "type": "plain_text",
                                "text": "Reabastecer as cápsulas de :coffee: e os pacotes de açucar;",
                                "emoji": true
                            }
                        ]
                    }
                ]
            }
        )
        /*
        // create a bot
        var bot = new SlackBot({
            token: 'xoxb-489188369799-879254176725-iYFOneouTC3Fkpm5DlnCBS2p', // Add a bot https://my.slack.com/services/new/bot and put the token 
            name: 'My Bot'
        });
        var params = {
            icon_emoji: ':robot_face:'
        };
        bot.postMessage('CPNJQCP5J', message, params);
        */
    }
}