const uuid = require('uuid/v1');

module.exports = {
    model: 'Planning',
    roleName: 'planningdepartment',
    rolDescription: 'Planeación',
    users: [{ 
        id: uuid(),
        name: 'Jefe de planeacion',
        username: 'planeacion',
        email: 'planeacion@gmail.com',
        password: '123qwe'
    }]
}