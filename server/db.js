const Sequelize = require('sequelize');
const sequelize = new Sequelize('Workout Log', 'postgres', 'password',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to Workout Log postgres database');
    },
    function(err){
        console.log(err);
    }
);

User = sequelize.import('./models/user');
Logs = sequelize.import('./models/log');
UserInfo = sequelize.import('./models/userinfo')

Logs.belongsTo(User);
User.hasMany(Logs)

User.hasOne(UserInfo);
UserInfo.belongsTo(User);


module.exports = sequelize;