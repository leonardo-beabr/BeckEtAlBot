const cron = require('node-cron');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')

module.exports = {
    //This function will be executed every day at 8:00 AM from Monday to Friday
    EveryDayFunction(){
        console.log('EveryDayFunction')
        let date = new Date()
        let startAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`, counter = date.getDay();
        cron.schedule("* * * * 1-5", () => {
            console.log(startAt)
            console.log("entrou na func")
            console.log(counter)
            Airtable.OfficeDuties(startAt).then(response => {
                console.log(response)
                endAt = response[0]['End']
                Slack.NotifyUser(response)
                counter++;
            })
            if(counter === 5){
                startAt = `${date.getMonth() + 1 }/${date.getDate() + 5}/${date.getFullYear()}`
                counter = 0
            }
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo"
        })
    }
}