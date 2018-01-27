const uuid = require('uuid/v1');

module.exports = {
    model: 'Planning',
    roleName: process.env.ROL_PLANNING,
    rolDescription: 'Planeación',
    users: [{ 
        id: uuid(),
        name: process.env.PLANNING_NAME,
        username: process.env.PLANNING_USERNAME,
        email: process.env.PLANNING_EMAIL,
        password: process.env.PLANNING_PASSWORD
    }]
}