'use strict';
const app = require('../../server/server');
const { waterfall } = require('async');
module.exports = Planning => {
    
    Planning.addBoss = (boss_departmentId, cb) => {
        const BossDepartment = app.models.Boss_department;
        addUserToRol( BossDepartment, boss_departmentId, 'bossdepartment')
            .then( principal => cb( null, principal ))
            .catch( error => cb( error ))
    }

    Planning.remoteMethod('addBoss', {
        http: { path: '/addBoss/:boss_departmentId', verb: 'post'},
        accepts: { arg: 'boss_departmentId', type: 'string' },
        returns:[
            { arg: 'result', type: 'object' },
        ]
    })

    Planning.addVicePrincipal = (vice_principalId, cb) => {

        const VicePrincipal = app.models.Vice_principal;
        addUserToRol( VicePrincipal, vice_principalId, 'viceprincipal')
            .then( principal => cb( null, principal ))
            .catch( error => cb( error ))
    }

    Planning.remoteMethod('addVicePrincipal', {
        http: { path: '/addVicePrincipal/:vice_principalId', verb: 'post'},
        accepts: { arg: 'vice_principalId', type: 'string' },
        returns:[
            { arg: 'result', type: 'object' },
        ]
    })


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
