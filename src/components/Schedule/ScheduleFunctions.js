const cron = require('node-cron');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')

module.exports = {
    //This function will be executed every day at 8:00 AM from Monday to Friday
    EveryDayFunction(){
        // var date = new Date();
        console.log('EveryDayFunction')
        cron.schedule("* * * * 1-5", () => {
            const date = new Date()
            // const checkLastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0)
            //Get the day of the Monday of the week
            let startAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`; //Will get the Monday
            let endAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 5}/${date.getFullYear()}` //Will get the Friday
            let users; //will store the janitors of the week
            let currentDay = `${date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
            //Will execute the function passing the value of the Monday of the current week
            Airtable.ReadOfficeTable(startAt, currentDay, endAt) //test use currentDay
            .then(response => {
                //Then will Notify in a channel using the variable response
                console.log(response)
                users = response['janitors']
                // counter++;
                if(response['nextJanitors']){
                    if(response['janitors'].length === 0){
                        users = response['nextJanitors']
                    }
                    startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate()+3)
                    endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7)
                    Airtable.ChangeJanitorsDate({
                        'start': `${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`, 
                        'end': `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`
                    }, response['nextJanitors'])
                }
                Slack.EverydayNotify({'janitors': users,'birthdays':response['birthdays']})
            })
            .catch(error =>{
                Slack.ErrorNotify(error)
                if(error === 'no users found'){
                }
            })
            //Its was removed bacause at the moment wasnt necessary to use
            // if(date.getDay() === 5){
            //     //Set the start for the next Monday
            //     //Need to use + 3
            //     startAt = `${date.getMonth() + 1 }/${date.getDate() + 3}/${date.getFullYear()}`//Vai pegar o valor da próxima segunda feira
            //     counter = 1;
            //     // Airtable.ChangeJanitorsDate(users)
            // }
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo" //Uses a custom time zone
        })
    }
}