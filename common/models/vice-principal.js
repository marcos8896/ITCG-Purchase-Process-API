'use strict';

module.exports = Viceprincipal => {
    const app = require('../../server/server');
    const uuidv1 = require('uuid/v1');
    
    Viceprincipal.afterRemote('create', (ctx, modelInstance, next) => {
        const Role = app.models.Role;
        const RoleMapping = app.models.RoleMapping;
        Role.findOne({ where: { name: 'viceprincipal' } }, (err, role) => {
            if ( err ) next( err );
            if ( role ) {
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: modelInstance.id
                }, (err, principal) => {
                    if ( err ) next ( err );
                    console.log('Principal created: ', principal);
                    next();
                })
            } else console.log(`There's no role matched`)
        })
    });

    Viceprincipal.beforeRemote('create', (ctx, unused, next) => {
        ctx.req.body.id = uuidv1();
        next();
    })
};

