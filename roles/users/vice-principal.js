require('dotenv').config();

module.exports = {
    model: 'Vice_principal',
    roleName: process.env.ROL_VICE_PRINCIPAL,
    rolDescription: 'Subdirector',
    users: [{ 
        id: 3,
        name: 'Juan Manuel Topete',
        username: 'jmanueltopete',
        hasRole: true,
        email: 'jmanueltopete@gmail.com',
        password: '123qwe'
    },
    {
        id: 4,
        name: 'Michel',
        username: 'Michel',
        hasRole: true,
        email: 'michel@gmail.com',
        password: '123qwe'
    }]
}