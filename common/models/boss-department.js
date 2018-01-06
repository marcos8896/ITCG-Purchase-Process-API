'use strict';

module.exports = Bossdepartment => {
    // Falta: 
    // Crear el modelo Subdirector y crear la relación: 'Subdirector hasOne subdirection'
    // Elminar del JSON, el campo boss_name del modelo subdirection
    Bossdepartment.afterRemote('login', (ctx, user, next) => {
        // Se indica si es BOSS DEPARTMENT o es SUBDIRECTOR
        // Para que sepa si hara un GET al endpoint 1 o 2
        // Con el header Authorization y el token
        // 1: http://localhost:3000/api/Boss_departments/{userId}?filter[include][department]=requisition
        // 2: http://localhost:3000/api/Subdirector/{userId}?filter[include]=subdirection

        user.type = 'BOSS DEPARTMENT';
        next();
    })
};
