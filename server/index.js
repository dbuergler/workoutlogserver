let express = require('express');
let app = express();
let log = require('./controllers/logcontroller');
let user = require('./controllers/userlogcontroller');
let sequelize = require('./db');

app.use(express.json());

app.use('/log', log);
app.use('/user', user);

sequelize.sync();

//sequelize.sync({force: true})




app.listen(3000, function() {
    console.log('App is listening on port 3000');
})