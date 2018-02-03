'use strict';
const planningService = require('./planning.service');
module.exports = Planning => {
    // Create a method for removeBoss and removeVicePrincipal
    // To revoke permissions and remove the role

    /**
     * Remote hook description:
     * Before create a new register, a unique id (built with uuid library)
     * will be added to that request. This with the reason of avoid same 
     * ids between Bossdepartment, Vice_principal and Planning models 
     */
    Planning.beforeRemote('create', planningService.beforeRemoteCreate)

    /**
     * Remote hook description:
     * 'type' property will be added to the instance (user) that will be 
     * returned in the login request. With 'type' property, the client
     * application will know which type of user is loggin in
     */
    Planning.afterRemote('login', planningService.afterRemoteLogin)
    
    /**
     * Add a Boss_department register to a role by its id
     * 
     * @param {string} boss_departmentId the id of a Boss_department register
     * @param {function} cb Callback
     */
    Planning.addBoss = planningService.addBoss
    
    /**
     * Remote method for addBoss
     */
    Planning.remoteMethod('addBoss', {
        http: { path: '/addBoss/:boss_departmentId', verb: 'post'},
        accepts: { arg: 'boss_departmentId', type: 'string' },
        returns:[
            { arg: 'result', type: 'object' },
        ]
    })

    /**
     * Add a Vice_principal register to a role by its id
     * 
     * @param {string} vice_principalId the id of a Vice_principal register
     * @param {function} cb Callback
     */
    Planning.addVicePrincipal = planningService.addVicePrincipal

    /**
     * Remote method for addVicePrincipal
     */
    Planning.remoteMethod('addVicePrincipal', {
        http: { path: '/addVicePrincipal/:vice_principalId', verb: 'post'},
        accepts: { arg: 'vice_principalId', type: 'string' },
        returns:[
            { arg: 'result', type: 'object' },
        ]
    })

};
