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