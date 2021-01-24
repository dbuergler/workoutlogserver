require('dotenv').config();
let express = require('express');
let app = express();
let log = require('./controllers/logcontroller');
let user = require('./controllers/userlogcontroller');
let sequelize = require('./db');


sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/log', log);
app.use('/user', user);







app.listen(3000, function() {
    console.log('App is listening on port 3000');
})