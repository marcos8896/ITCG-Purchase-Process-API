'use strict';

module.exports = Bossdepartment => {
    require('dotenv').config();
    const   app = require('../../server/server'),
            uuidv1 = require('uuid/v1');
    
    /**
     * Remote hook description:
     * 'type' property will be added to the instance (user) that will be 
     * returned in the login request. With 'type' property, the client
     * application will know which type of user is loggin in
     */
    Bossdepartment.afterRemote('login', (ctx, user, next) => {
        user.type = process.env.ROL_BOSS_DEPARTMENT;
        next();
    })

    /**
     * Remote hook description:
     * Before create a new register, a unique id (built with uuid library)
     * will be added to that request. This with the reason of avoid same 
     * ids between Bossdepartment and Vice_principal models 
     */
    Bossdepartment.beforeRemote('create', (ctx, unused, next) => {
        ctx.req.body.id = uuidv1();
        next();
    })
};
