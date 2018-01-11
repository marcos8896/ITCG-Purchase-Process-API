'use strict';
const app = require('../../server/server');
const { waterfall } = require('async');
module.exports = Planning => {
    /**
     * Add a Boss_department register to a role by its id
     * 
     * @param {string} boss_departmentId the id of a Boss_department register
     * @param cb Callback
     */
    Planning.addBoss = (boss_departmentId, cb) => {
        const BossDepartment = app.models.Boss_department;
        addUserToRol( BossDepartment, boss_departmentId, 'bossdepartment')
            .then( principal => cb( null, principal ))
            .catch( error => cb( error ))
    }
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
     * @param cb Callback
     */
    Planning.addVicePrincipal = (vice_principalId, cb) => {
        const VicePrincipal = app.models.Vice_principal;
        addUserToRol( VicePrincipal, vice_principalId, 'viceprincipal')
            .then( principal => cb( null, principal ))
            .catch( error => cb( error ))
    }
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

    /**
     * Associate an id to a specific role
     * 
     * @param {string} rolName name of the role 
     * @param {string} id id that will be added to the rolName
     */
    function addRole(rolName, id) {
        const Role = app.models.Role;
        const RoleMapping = app.models.RoleMapping;
        return new Promise( (resolve, reject) => {
            Role.findOne({ where: { name: rolName } }, (err, role) => {
                if ( err ) return reject( err );
                if ( role ) {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: id
                    }, (err, principal) => err ? reject( err ) : resolve ( principal ))
                } else reject(`There's no role matched`)
            })     
        })
    }

    /**
     * The whole process to add a user to a rol
     * 
     * @param {Object} Model Model from Loopback responsible for add the new register
     * @param {string} id id of the register that will be added in a new rol
     * @param {string} rolName name of the rol
     */
    function addUserToRol( Model, id, rolName) {
        const RoleMapping = app.models.RoleMapping;
        return new Promise( (resolve, reject) => {
            waterfall([
                // Verify if there is a current register with
                // the id, passed by params
                next => {
                    Model.findById( id, (err, register) => {
                        console.log(register)
                        if ( err ) return next( err ); // An error have ocurred
                        if ( register ) return next(); // There IS a register with such id
                        // There IS NOT a register with such id
                        return next(`No existe un registro con el id: ${id}`);
                    })
                },
                // Verify if id hasn't been added before as a principal
                next => {
                    RoleMapping.findOne({ where: { principalId: id }}, (err, role) => {
                        if ( err ) return next( err );
                        if ( role ) return next('Este registro ya ha sido agregado al rol');
                        return next();
                    })
                },
                // The register will be added to his role
                next => {
                    addRole(rolName, id)
                        .then( principal => next( null, principal ))
                        .catch( error => next( error ))
                }
            ],
            (err, principal) => err ? reject( err ) : resolve( principal ))

        })
    }
};
