const cron = require('node-cron');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')

module.exports = {
    //This function will be executed every day at 8:00 AM from Monday to Friday
    EveryDayFunction(){
        console.log('EveryDayFunction')
        const date = new Date()
        //Get the day of the Monday of the week
        let startAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`; //Will get the Monday
        let endAt = `${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 5}/${date.getFullYear()}` //Will get the Friday
        let counter = date.getDay();
        console.log(endAt)
        cron.schedule("* * * * 1-5", () => {
            console.log('Schedule Working')
            let users;
            //This will set a value between 0 and 6 (Sun-Sat)
            let currentDay = '1/24/2020' // `${date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
            //Will execute the function passing the value of the Monday of the current week
            Airtable.ReadOfficeTable(startAt, currentDay, endAt) //test use currentDay
            .then(response => {
                console.log(response)
                //Then will Notify in a channel using the variable response
                users = response['janitors']
                counter++;
                if(response['nextJanitors'].length !== 0){
                    const newDate = new Date()
                    users = response['nextJanitors'];
                    Airtable.ChangeJanitorsDate({
                        'start': `${newDate.getMonth() + 1 }/${newDate.getDate() - newDate.getDay() + 1}/${newDate.getFullYear()}`, 
                        'end': `${newDate.getMonth() + 1 }/${newDate.getDate() - newDate.getDay() + 5}/${newDate.getFullYear()}`
                    }, response['nextJanitors'])
                }
                Slack.EverydayNotify({'janitors': users,'birthdays':response['birthdays']})
            })
            .catch(error =>{
                Slack.ErrorNotify(error)
                if(error === 'no users found'){
                }
            })
            if(counter === 5){
                //Set the start for the next Monday
                //Need to use + 3
                startAt = `${date.getMonth() + 1 }/${date.getDate() + 3}/${date.getFullYear()}`//Vai pegar o valor da próxima segunda feira
                counter = 0;
                // Airtable.ChangeJanitorsDate(users)
            }
        },{
            scheduled: true,
            timezone: "America/Sao_Paulo" //Uses a custom time zone
        })
    }
}