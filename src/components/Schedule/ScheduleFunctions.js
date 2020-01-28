const cron = require('node-cron');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')

module.exports = {
    //This function will be executed every day at 8:00 AM at Mondays and Thursdays
    EveryDayFunction(){
        console.log('EveryDayFunction')
        cron.schedule("10 8 * * 1,4", () => { //Maybe this condition will be used "10 8 * * 1,4"
            const date = new Date()
            //Get the day of the Monday of the week
            let startAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`); //Will get the Monday
            let endAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 4}/${date.getFullYear()}`) //Will get the Thursday
            let users; //will store the janitors of the week
            let currentDay = `${date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
            //Will execute the function passing the value of the Monday of the current week
            Airtable.ReadOfficeTable(`${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`, currentDay, `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`) //test use currentDay
            .then(response => {
                //Then will Notify in a channel using the variable response
                // console.log(response)
                users = response['janitors']
                // counter++;
                if(response['nextJanitors']){
                    if(response['janitors'].length === 0){
                        users = response['nextJanitors']
                    }
                    if(response['janitors'].length !== 0){
                        startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 8) //Will get the next Monday
                        endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 11)// will get the next friday
                    }
                    Airtable.ChangeJanitorsDate({
                        'start': `${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`, 
                        'end': `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`
                    }, response['nextJanitors'])
                    .catch(error => {
                        Slack.ErrorNotify(error)
                    })
                }
                Slack.EverydayNotify({'janitors': users,'birthdays':response['birthdays']})
            })
            .catch(error =>{
                Slack.ErrorNotify(error)
                if(error === 'no users found'){
                }
            })
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo" //Uses a custom time zone
        })
    }
}