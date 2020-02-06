const weather = require('weather-js');
module.exports = {
    GetWeather(){
        return new Promise( function(resolve, reject){
            weather.find({search: '88075-120, SC', degreeType: 'C'}, function(err, result) {
                if(err){console.log(err);reject(err)}
                else{
                    let phrase = `A temperatura atual em ${result[0]['location']['name']} é de ${result[0]['current']['temperature']}°C com máxima de ${result[0]['forecast'][1]['high']}°C e mínima de ${result[0]['forecast'][1]['low']}°C.`
                    if(result[0]['current']['skytext'] === 'Light Rain'){
                        phrase = phrase + ` Hoje o dia terá chuva de leve :cloud: :umbrella:.`
                    }
                    if(result[0]['current']['skytext'] === 'Rain Showers'){
                        phrase = phrase + ` Hoje o dia será chuvoso :cloud: :umbrella:.`
                    }
                    if(result[0]['current']['skytext'] === 'T-Storms'){
                        phrase = phrase + ` Teremos chuvas com trovoadas :cloud: :zap:.`
                    }
                    if(result[0]['current']['skytext'] === 'Cloudy' || result[0]['current']['skytext'] === 'Mostly Cloudy'){
                        phrase = phrase + ` O dia de hoje será nublado :cloud:.`
                    }
                    if(result[0]['current']['skytext'] === 'Sunny' || result[0]['current']['skytext'] === 'Mostly Sunny'){
                        phrase = phrase + ` Hoje será um dia ensolarado :sunny:.`
                    }
                    const weatherInfo = {
                        'location': result[0]['location']['name'],
                        'today': {
                            'temperature' : result[0]['current']['temperature'],
                            'skytext' : result[0]['current']['skytext'],
                            'humidity': result[0]['current']['humidity'],
                            'winddisplay': result[0]['current']['winddisplay'],
                            'high': result[0]['forecast'][1]['high'],
                            'low': result[0]['forecast'][1]['low']
                        },
                        'tomorrow':{
                            'skytext' : result[0]['forecast'][2]['skytextday'],
                            'high': result[0]['forecast'][2]['high'],
                            'low': result[0]['forecast'][2]['low']
                        },
                        'phrase': phrase
                    }
                    resolve(weatherInfo)
                    }
                // console.log(JSON.stringify(result, null, 2));
            });
        })
    }
}