//Variables of the system;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
//const cors = require('cors');
//const io = require('socket.io');

const port = 8000;

app.use((req, res, next)=>{
    next();
})
//app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes'))

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
    const Schedule = require('./components/Schedule/ScheduleFunctions');
    Schedule.EveryDayFunction()
})
