var Airtable = require('airtable');
const apiKey = 'keyssmLoe5N3w0lrX' //ApiKey of my user
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: apiKey
});

module.exports = {
    OfficeDuties(dayStart){
        var janitors = []
        var base = Airtable.base('appgX5C9CkrmsFRml'); //ID of the base
        //Async function that returns a array
        return new Promise(function(resolve, reject){
            //For this params will be return all the records of the base
            base('Office Duties').select({
                view: "Grid view",
            }).eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
                records.forEach(function(record) {
                    if(record.get('Start') === dayStart){
                        //compare if the value Start if the same of the variable dayStart
                        janitors.push(record.fields)//add to the array the object
                    }
                });
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            
            }, function done(err) {
                if (err) { console.error(err); reject(err);return; }
                console.log('Done')
                //console.log(janitors)
                resolve(janitors)//will pass the value of the variable
            });
        })
    }
}