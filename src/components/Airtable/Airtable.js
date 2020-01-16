var Airtable = require('airtable');
const apiKey = 'keyssmLoe5N3w0lrX' //ApiKey of my user
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: apiKey
});

module.exports = {
    ReadOfficeTable(dayStart, currentDay){
        console.log(dayStart, currentDay)
        var storeResponse = {'janitors': [], 'birthdays': []}
        var base = Airtable.base('appgX5C9CkrmsFRml'); //ID of the base
        const bases = ['Office Duties', 'Birthday']
        //Async function that returns a array
        return new Promise(async function(resolve, reject){
            let counter = 0;
            //For this params will be return all the records of the base
            for await (const currentBase of bases){
                console.log(currentBase)
                const table = base(currentBase)
                table.select({
                    view: "Grid view",
                }).eachPage(function page(records, fetchNextPage){
                    // This function (`page`) will get called for each page of records.
                    records.forEach(function(record) {
                        if(currentBase === 'Office Duties'){
                            if(record.get('Start') === dayStart){
                                //compare if the value Start if the same of the variable dayStart
                                storeResponse['janitors'].push(record.fields)//add to the array the object
                            }
                        }
                        else if(currentBase === 'Birthday'){
                            if(record.get('Day') === currentDay){
                                //compare if the value Start if the same of the variable dayStart
                                storeResponse['birthdays'].push(record.fields)//add to the array the object
                            }
                        }
                    });
                    //console.log(records)
                    console.log('Finished')
                    counter++;
                    // To fetch the next page of records, call `fetchNextPage`.
                    // If there are more records, `page` will get called again.
                    // If there are no more records, `done` will get called.
                    fetchNextPage();
                
                }, function done(err) {
                    console.log('entrou no done')
                    //console.log('current i', i)
                    if (err) { console.error(err); reject(err);return; }
                    console.log(counter, bases.length)
                    if(counter === bases.length){
                        console.log("Done")
                        resolve(storeResponse)//will pass the value of the variable
                    }
                })
            }
        })
    }
}