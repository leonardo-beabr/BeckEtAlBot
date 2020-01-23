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
