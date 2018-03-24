'use strict';
const vicePrincipalService = require('./vice-principal.service');

module.exports = Viceprincipal => {
    const app = require('../../server/server');
    const uuidv1 = require('uuid/v1');
    require('dotenv').config();
    /**
     * Remote hook description:
     * 'type' property will be added to the instance (user) that will be 
     * returned in the login request. With 'type' property, the client
     * application will know which type of user is loggin in
     */
    Viceprincipal.afterRemote('login', (ctx, user, next) => {
        user.type = process.env.ROL_VICE_PRINCIPAL;
        next();
    })

    /**
     * Remote hook description:
     * Before create a new register, a unique id (built with uuid library)
     * will be added to that request. This with the reason of avoid same 
     * ids between Bossdepartment and Vice_principal models 
     */
    Viceprincipal.beforeRemote('create', (ctx, unused, next) => {
        ctx.req.body.id = uuidv1();
        next();
    })

    /** 
     * Obtain relation: 
     * VicePrincipal 
     *  (has) Subdirection 
     *      (has) Department 
     *          (has) BossDepartment 
     *              (has) Requisition
     * 
     */
    Viceprincipal.getRequisitionsToSign = vicePrincipalService.getRequisitionsToSign

    /**
     * Remote method for getRequisitionsToSign
     */
    Viceprincipal.remoteMethod('getRequisitionsToSign', {
        http: { path: '/getRequisitionsToSign/:vice_principalId', verb: 'get'},
        accepts: { arg: 'vice_principalId', type: 'string' },
        returns:[
            { arg: 'result', type: 'object' },
        ]
    })
};

