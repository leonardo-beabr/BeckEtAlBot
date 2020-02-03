'use strict'
const AWS = require('aws-sdk');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')
const Weather = require('../Weather/WeatherFunctions')

module.exports.EveryDay = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // await new Promise(function(){
    //     const date = new Date()
    //     //Get the day of the Monday of the week
    //     let startAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`); //Will get the Monday
    //     let endAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 4}/${date.getFullYear()}`) //Will get the Thursday
    //     let users; //will store the janitors of the week
    //     let currentDay = `${date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
    //     //Will execute the function passing the value of the Monday of the current week
    //     let getWeather = '';
    //     Weather.GetWeather().then(function(weather){
    //         getWeather = weather
    //     })
    //     Airtable.ReadOfficeTable(`${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`, currentDay, `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`) //test use currentDay
    //     .then(response => {
    //         //Then will Notify in a channel using the variable response
    //         // console.log(response)
    //         users = response['janitors']
    //         // counter++;
    //         if(response['nextJanitors']){
    //             if(response['janitors'].length === 0){
    //                 users = response['nextJanitors']
    //             }
    //             if(response['janitors'].length !== 0){
    //                 startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 8) //Will get the next Monday
    //                 endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 11)// will get the next friday
    //             }
    //             Airtable.ChangeJanitorsDate({
    //                 'start': `${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`, 
    //                 'end': `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`
    //             }, response['nextJanitors'])
    //             .catch(error => {
    //                 Slack.ErrorNotify(error)
    //             })
    //         }
    //         Slack.EverydayNotify({'janitors': response['phrase'], 'birthdays': response['birthdayPhrase'], 'weather': getWeather})
    //     })
    //     .catch(error =>{
    //         Slack.ErrorNotify(error)
    //         if(error === 'no users found'){
    //         }
    //     })
    // })
    try{
        await new Promise(function(reject, resolve){
            console.log('start')
            const date = new Date()
            //Get the day of the Monday of the week
            let startAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 1}/${date.getFullYear()}`); //Will get the Monday
            let endAt = new Date(`${date.getMonth() + 1 }/${date.getDate() - date.getDay() + 4}/${date.getFullYear()}`) //Will get the Thursday
            let users; //will store the janitors of the week
            let currentDay = `${date.getMonth() + 1 }/${date.getDate()}/${date.getFullYear()}`;
            //Will execute the function passing the value of the Monday of the current week
            let getWeather = '';
            Weather.GetWeather().then(function(weather){
                getWeather = weather
            })
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
                Slack.EverydayNotify({'janitors': response['phrase'], 'birthdays': response['birthdayPhrase'], 'weather': getWeather})
                return {
                    statusCode: 301,
                    body: {}
                    // body: JSON.stringify(
                    //   {
                    //     message: 'Go Serverless v1.0! Your function executed successfully!'
                    //   },
                    //   null,
                    //   2
                    // ),
                };
            })
            .catch(error =>{
                Slack.ErrorNotify(error)
                if(error === 'no users found'){
                }
            })
        })
        console.log('finish')
    }catch(err){
        return err
    }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};