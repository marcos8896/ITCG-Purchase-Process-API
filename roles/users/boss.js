module.exports = {
    model: 'Boss_department',
    roleName: process.env.ROL_BOSS_DEPARTMENT,
    rolDescription: 'Jefe de departamento',
    users: [{ 
        id: 1,
        name: 'Ada Mabel',
        username: 'adamabel',
        hasRole: true,
        email: 'adamabel@gmail.com',
        password: '123qwe'
    },
    {
        id: 2,
        name: 'Rodolfo',
        username: 'rodolfo',
        hasRole: true,        
        email: 'rodolfo@gmail.com',
        password: '123qwe'
    }]
}