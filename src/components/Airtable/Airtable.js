var Airtable = require('airtable');
const apiKey = 'keyssmLoe5N3w0lrX'
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: apiKey
});

module.exports = {
    OfficeDuties(dayStart){
        var janitors = []
        var base = Airtable.base('appgX5C9CkrmsFRml'); //ID of the base
        return new Promise(function(resolve, reject){
            base('Office Duties').select({
                // Selecting the first 3 records in Grid view:
                view: "Grid view",
            }).eachPage(function page(records, fetchNextPage) {
                //console.log(records)
                // This function (`page`) will get called for each page of records.
                records.forEach(function(record) {
                    if(record.get('Start') === dayStart){
                        janitors.push(record.fields)
                    }
                    //console.log(record.fields)
                    //console.log('Retrieved', record.get('Name'));
                    //console.log('Start', record.get('Start'))
                });
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            
            }, function done(err) {
                if (err) { console.error(err); reject(err);return; }
                console.log('Finalizou')
                //console.log(janitors)
                resolve(janitors)
            });
        })
    }
}