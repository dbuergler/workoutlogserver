let express = require('express');
let app = express();
let log = require('./controllers/logcontroller')
let sequelize = require('./db');

app.use('/log', log)
sequelize.sync();
//sequelize.sync({force: true})




app.listen(3000, function() {
    console.log('App is listening on port 3000');
})