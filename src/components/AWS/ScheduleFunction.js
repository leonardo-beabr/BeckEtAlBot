'use strict'
const AWS = require('aws-sdk');

const Airtable = require('../Airtable/Airtable');
const Slack = require('../Slack/SlackFunctions')
const Weather = require('../Weather/WeatherFunctions')

exports.handler = async (event, context) => {
    // console.log(event)
    // console.log(context)
    const promise = new Promise(function(resolve, reject){
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
            setTimeout(()=>{
                resolve({statusCode : 301})
            }, 5000)
        })
        .catch(error =>{
            Slack.ErrorNotify(error)
            if(error === 'no users found'){
            }
            reject(error)
        })
    })
    return promise
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};