const uuid = require('uuid/v1');

module.exports = {
    model: 'Planning',
    roleName: process.env.ROL_PLANNING,
    rolDescription: 'Planeación',
    users: [{ 
        id: process.env.PLANNING_ID,
        name: process.env.PLANNING_NAME,
        username: process.env.PLANNING_USERNAME,
        email: process.env.PLANNING_EMAIL,
        password: process.env.PLANNING_PASSWORD
    }]
}