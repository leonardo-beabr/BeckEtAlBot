//Method to set a random message
/*
let janitorPhrases = {
    'portuguese': [0, 4, 6],
    'english': [1, 2, 3],
    'spanish': ['a', 'b', 'c'],
    'german': ['d', 'e', 'f']
}
let birthdaysPhrases = {
    'portuguese': ['x', 'y', 56],
    'english': ['q', 'w', 'e'],
    'spanish': ['r', '7'],
    'german': [5, 8, 4, 91]
}
const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
console.log('Emoji1: ', emojiList[Math.floor(Math.random()*emojiList.length)])
console.log('Emoji2: ', emojiList[Math.floor(Math.random()*emojiList.length)])
function RandomPhrase(janitor, birthday){
    // const keys = Object.keys(janitor)
    // console.log(keys)
    const randomLanguage = Object.keys(janitor)[Math.floor(Math.random() * Object.keys(janitor).length)]    
    console.log('language: ',randomLanguage)
    console.log('janitorPhrasesArray: ', janitor[randomLanguage])
    console.log('birthdaysPhrasesArray: ', birthday[randomLanguage])
    console.log('currentJanitorPhrase: ',janitor[randomLanguage][Math.floor(Math.random() * janitor[randomLanguage].length)])
    console.log('currentBirthdayPhrase: ',birthday[randomLanguage][Math.floor(Math.random() * birthday[randomLanguage].length)])
    // console.log()
}
RandomPhrase(janitorPhrases, birthdaysPhrases)
*/
//Method to set next monday and next friday
// const date = new Date(2020, 2, 28)
// const startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 8)
// const endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 12)
// console.log('startAt: ', `${startAt.getMonth() + 1 }/${startAt.getDate()}/${startAt.getFullYear()}`)
// console.log('endAt: ', `${endAt.getMonth() + 1 }/${endAt.getDate()}/${endAt.getFullYear()}`)

//NLP Luis Method
// const axios = require('axios')
// const phrase = 'Ola'
// axios.get(
//     `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/697902f5-988f-4a84-9bdf-f7973b60ee30?staging=true&verbose=true&timezoneOffset=-360&subscription-key=9cfd01b04e9c4bfba103ab396ec32211&q=${phrase}`
//     )
// .then(function(response){
//     console.log(response.data)
// })

//Random method to sort a message
// let message = ''
// const janitor1 = 'Leo', janitor2 = 'Oel'
// const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
// const phrases = [
//     `Bom dia! Hoje ${janitor1} e ${janitor2} estarão auxiliando na organização do nosso ambiente de trabalho`,
//     `Bahhhh gurizada, hoje os Zelas são os ${janitor1} ${janitor2} dos meu. Eles que vão dar uma girica na cozinha neh!`,
//     `E ai camaradinhas, os zeladores de hoje são ${janitor1} e ${janitor2}. Vamo dalhe!`
// ]
// message = `${emojiList[Math.floor((Math.random()* emojiList.length))]} ${phrases[Math.floor((Math.random()* phrases.length))]} ${emojiList[Math.floor((Math.random()* emojiList.length))]}`
// console.log(message)

//Random Airtable message
// var Airtable = require('airtable');
// require('dotenv').config()
// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: ''
// });
// const base = Airtable.base(''); //ID of the base
// const bases = ['Office Duties', 'Birthday', 'Users Id', 'Date Backup', 'Phrases']
// let store = []
// async function DemoTable(){
//     for await (const currentBase of bases){
//         const table = base(currentBase)
//         table.select({
//             'view': 'Grid view'
//         }).eachPage(function page(records, fetchNextPage){
//             records.forEach(function(record){
//                 if (currentBase === 'Phrases'){
//                     const janitor1 = "John", janitor2 = "Jane"
//                     let phrase = record.get('Phrase').toString()
//                     var n = phrase.search('janitor1')
//                     if(n !== -1 ){
//                         console.log(phrase[n])
//                         phrase[n] = janitor1
//                     }
//                     console.log(phrase)                   
//                     // // const teste = `Bahhhh gurizada, hoje os Zelas são os ${janitor1} ${janitor2} dos meu. Eles que vão dar uma girica na cozinha neh!`
//                     // phrase = '`'+phrase+'`'
//                     // console.log(phrase)
//                     // // console.log(teste)
//                 }
//             })
//             fetchNextPage()
//         }, function done(err){
//             if(err){console.log(err);return}
//             console.log('Done')
//             // console.log(store[0][0])
//         })
//     }
// }
// DemoTable()
// // console.log(store[0])
//Weather
// const request = require('request')
// let apiKey = ''
// let city = '';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
// request(url, function (error, response, body) {
//     if(error){
//       console.log('error:', error);
//     } else {
//       let weather = JSON.parse(body)
//       console.log(weather)
//     //   let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//     //   console.log(message);
//     }
//   });
// // weather()
// var weather = require('weather-js');
 
// Options:
// search:     location name or zipcode
// degreeType: F or C
 
// weather.find({search: '', degreeType: 'C'}, function(err, result) {
//     if(err) console.log(err);
//     console.log(JSON.stringify(result, null, 2));
//     const phrase = `A temperatura atual em ${result[0]['location']['name']} é de ${result[0]['current']['temperature']} com máxima de ${result[0]['forecast'][1]['high']} e mínima de ${result[0]['forecast'][1]['low']}`
//     const weatherInfo = {
//         'location': result[0]['location']['name'],
//         'today': {
//             'temperature' : result[0]['current']['temperature'],
//             'skytext' : result[0]['current']['skytext'],
//             'humidity': result[0]['current']['humidity'],
//             'winddisplay': result[0]['current']['winddisplay'],
//             'high': result[0]['forecast'][1]['high'],
//             'low': result[0]['forecast'][1]['low']
//         },
//         'tomorrow':{
//             'skytext' : result[0]['forecast'][2]['skytextday'],
//             'high': result[0]['forecast'][2]['high'],
//             'low': result[0]['forecast'][2]['low']
//         },
//         'phrase': phrase
//     }
//     console.log(weatherInfo)
// });