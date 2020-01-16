const cron = require('node-cron');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')

module.exports = {
    //This function will be executed every day at 8:00 AM from Monday to Friday
    EveryDayFunction(){
        console.log('EveryDayFunction')
        let everydayJob = cron.schedule("0 8 * * 1-5", () => {
            console.log('Schedule Working')
            let date = new Date()
            //Get the day of the Monday of the week
            let startAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`;
            //This will set a value between 0 and 6 (Sun-Sat)
            let counter = date.getDay();
            //Will execute the function passing the value of the Monday of the current week
            Airtable.OfficeDuties(startAt).then(response => {
                //Then will Notify in a channel using the variable response
                Slack.NotifyUser(response)
                counter++;
            })
            if(counter === 5){
                //Set the start for the next Monday
                //Need to use + 3
                startAt = `${date.getMonth() + 1 }/${date.getDate() + 5}/${date.getFullYear()}`
                counter = 0
            }
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo" //Uses a custom time zone
        })
    }
}