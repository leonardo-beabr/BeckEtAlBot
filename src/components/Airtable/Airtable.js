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
        var storeResponse = {'janitors': [], 'birthdays': [], 'nextJanitors': [], 'storeJanitors':[]}
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
                        if(currentBase === 'Date Backup'){
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
                    console.log(counter, bases.length)
                    if(counter === bases.length){
                        if(storeResponse['nextJanitors'].length === 0){//will check if have any item in the array.
                            if(currentDay === dayEnd){//if the current day is the same of dayEnd the variable will set the value of the first two itens of the base
                                storeResponse['nextJanitors'] = storeResponse['storeJanitors']
                            }
                            else{
                                delete storeResponse['nextJanitors']//if dont will delete this item of the response
                            }
                        }
                        if(storeResponse['janitors'].length === 0 && storeResponse['storeJanitors'].length !== 0){
                            //will check the value of the janitors and the length of the storeJanitors
                            storeResponse['nextJanitors'] = storeResponse['storeJanitors']
                        }
                        delete storeResponse['storeJanitors']
                        resolve(storeResponse)
                    }
                })
            }
        })
    },
    ChangeJanitorsDate(dates = {'start': String, 'end': String}, users = Array){
        console.log('ChangeJanitorsDate')
        let updateUsers = [];
        for(let i = 0; i < 2; i++){
            updateUsers.push({
                'id': users[i]['id'],
                'fields': users[i]
            })
            updateUsers[i]['fields']['Start'] = dates['start']
            updateUsers[i]['fields']['End'] = dates['end']
            updateUsers[i]['fields']['Work'] = 'false'
            delete updateUsers[i]['fields']['id']
        }
        // console.log(updateUsers)
        base(bases[3]).update(updateUsers, function(err, records){
            if(err){console.log(err);return;}
        })
    }
}