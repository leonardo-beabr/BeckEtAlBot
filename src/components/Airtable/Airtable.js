var Airtable = require('airtable');
require('dotenv').config()
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_KEY_AIRTABLE
});
const base = Airtable.base(process.env.AIRTABLE_BASE); //ID of the base
const bases = ['Office Duties', 'Birthday', 'Users Id', 'Date Backup']
module.exports = {
    ReadOfficeTable(dayStart, currentDay, dayEnd){
        var storeResponse = {'janitors': [], 'birthdays': [], 'nextJanitors': [], 'storeJanitors':[], 'phrase' : ``}
        //Async function that returns a array
        return new Promise(async function(resolve, reject){
            let counter = 0, ableStore = 0;
            //For this params will be return all the records of the base
            for await (const currentBase of bases){
                //console.log(currentBase)
                const table = base(currentBase)
                table.select({
                    view: "Grid view",
                }).eachPage(function page(records, fetchNextPage){
                    // This function (`page`) will get called for each page of records.
                    records.forEach(function(record) {
                        if(currentBase === 'Office Duties'){
                            if(record.get('Start') === dayStart){
                                //compare if the value Start if the same of the variable dayStart
                                storeResponse['janitors'].push({...record.fields, 'id': record.id})//add to the array the object
                            }
                            if(record.get('End') === currentDay){
                                //Verify if the record date its the same of the current
                                //This was created to verify the condition above of newJanitos
                                ableStore++;
                            }
                            if(storeResponse['nextJanitors'].length < 2 ){
                                //This will be used to store new janitors in the array
                                if(storeResponse['storeJanitors'].length < 2){//Will get the first two records of the base
                                    storeResponse['storeJanitors'].push({...record.fields, 'id': record.id}) //Será usada para coletar os dois primeiros nomes 
                                }
                                if((record.get('Start') === undefined && dayEnd === currentDay) || (ableStore === 2 && record.get('End') !== dayEnd)){
                                    //This will store the first two itens of the base wich is undefined or its a old base that need to be updated
                                    storeResponse['nextJanitors'].push({...record.fields, 'id': record.id});
                                }
                            }
                        }
                        if(currentBase === 'Birthday'){
                            if(record.get('Day') === currentDay){
                                //compare if the value Start if the same of the variable dayStart
                                storeResponse['birthdays'].push({...record.fields, 'id': record.id})//add to the array the object
                            }
                        }
                    });
                    counter++;
                    // To fetch the next page of records, call `fetchNextPage`.
                    // If there are more records, `page` will get called again.
                    // If there are no more records, `done` will get called.
                    fetchNextPage();
                
                }, function done(err) {
                    if (err) { console.error(err); reject(err);return; }
                    // console.log(counter, bases.length)
                    if(counter === bases.length){
                        let janitor1 = '', janitor2 = '' //will set the two janitors
                        // console.log(storeResponse)
                        if(storeResponse['nextJanitors'].length === 0){//will check if have any item in the array.
                            if(currentDay === dayEnd){//if the current day is the same of dayEnd the variable will set the value of the first two itens of the base
                                storeResponse['nextJanitors'] = storeResponse['storeJanitors']
                            }
                            else{
                                delete storeResponse['nextJanitors']//if dont will delete this item of the response
                            }
                        }
                        else if(storeResponse['nextJanitors'].length === 1 && storeResponse['janitors'].length === 2){
                            storeResponse['nextJanitors'].push(storeResponse['janitors'][0])
                            janitor1 = storeResponse['nextJanitors'][0]['Slack Id']; janitor2 = storeResponse['nextJanitors'][1]['Slack Id']
                        }
                        if(storeResponse['janitors'].length === 0 && storeResponse['storeJanitors'].length !== 0){
                            //will check the value of the janitors and the length of the storeJanitors
                            storeResponse['nextJanitors'] = storeResponse['storeJanitors']
                            janitor1 = storeResponse['nextJanitors'][0]['Slack Id']; janitor2 = storeResponse['nextJanitors'][1]['Slack Id']
                        }
                        else{
                            janitor1 = storeResponse['janitors'][0]['Slack Id']; janitor2 = storeResponse['janitors'][1]['Slack Id']
                        }
                        //Add the Phrase that will be sended to Slack
                        const emojiList = [":sparkles:", ":boom:", ":muscle:", ":trophy:", ":rocket:", ":hotsprings:"]
                        const phrases = [
                            `Bom dia! Hoje <@${janitor1}> e <@${janitor2}> estarão auxiliando na organização do nosso ambiente de trabalho.`,
                            `Bahhhh gurizada, hoje os Zelas são os <@${janitor1}> <@${janitor2}> dos meu. Eles que vão dar uma girica na cozinha neh!`,
                            `E ai camaradinhas, os zeladores de hoje são <@${janitor1}> e <@${janitor2}>. Vamo dalhe!`,
                            `Galera, a copa está aos cuidados de <@${janitor1}> e <@${janitor2}> hoje.`
                        ]
                        storeResponse['phrase'] = `${emojiList[Math.floor((Math.random()* emojiList.length))]} ${phrases[Math.floor((Math.random()* phrases.length))]} ${emojiList[Math.floor((Math.random()* emojiList.length))]}`
                        if(storeResponse['birthdays'].length === 1){
                            storeResponse['birthdays'] = `Temos um aniversariante hoje. Parabéns :tada: <@${params['birthdays'][0]['Slack Id']}> :tada:`
                        }
                        if(storeResponse['birthdays'].length > 1){
                            let birthdayPrhase = 'Hoje é um dia muito especial para: '
                            for(let i = 0; i < storeResponse['birthdays'].length; i++){
                                if(i === storeResponse['birthdays'].length - 1){
                                    birthdayPrhase = birthdayPrhase + ` e :tada: <@${storeResponse['birthdays'][i]['Slack Id']}> :tada:`
                                }
                                else{
                                    birthdayPrhase = birthdayPrhase + `:tada: <@${storeResponse['birthdays'][i]['Slack Id']}> :tada:`
                                }
                            }
                            storeResponse['birthdays'] = birthdayPrhase
                        }
                        //Method to set random messages
                        // let janitorPhrases = {
                        //     'portuguese': [],
                        //     'english': [],
                        //     'spanish': [],
                        //     'german': []
                        // }
                        // let birthdaysPhrases = {
                        //     'portuguese': [],
                        //     'english': [],
                        //     'spanish': [],
                        //     'german': []
                        // }
                        // function RandomPhrase(janitor, birthday){//Function to set an aleatory phrase
                        //     const randomLanguage = Object.keys(janitor)[Math.floor(Math.random() * Object.keys(janitor).length)] 
                        //     currentJanitorPhrase = janitor[randomLanguage][Math.floor(Math.random() * janitor[randomLanguage].length)]
                        //     if(params['birthdays'].length !== 0){
                        //         currentBirthdayPhrase = birthday[randomLanguage][Math.floor(Math.random() * birthday[randomLanguage].length)]
                        //     }
                        // }
                        // RandomPhrase(janitorPhrases, birthdaysPhrases)
                        delete storeResponse['storeJanitors']
                        resolve(storeResponse)
                    }
                })
            }
        })
    },
    ChangeJanitorsDate(dates = {'start': String, 'end': String}, users = Array){
        let updateUsers = [];
        for(let i = 0; i < 2; i++){
            updateUsers.push({
                'id': users[i]['id'],
                'fields': users[i]
            })
            updateUsers[i]['fields']['Start'] = dates['start']
            updateUsers[i]['fields']['End'] = dates['end']
            delete updateUsers[i]['fields']['id']
        }
        return new Promise(function(resolve, reject){
            base(bases[0]).update(updateUsers, function(err, records){
                if(err){
                    reject(err)
                }
            })
        })
    }
}