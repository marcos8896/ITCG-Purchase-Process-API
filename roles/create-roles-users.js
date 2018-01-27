const   app = require('../server/server'),
        { parallel, each } = require('async'),
        Role = app.models.Role,
        RoleMapping = app.models.RoleMapping,
        bosses = require('./users/boss'),
        vicePrincipals = require('./users/vice-principal'),
        planningUsers = require('./users/planning'),
        BossDepartment = app.models[bosses.model],
        VicePrincipal = app.models[vicePrincipals.model];
        Planning = app.models[planningUsers.model];


/**
 * 
 * Main method for creating a new collection of registers  to
 * a specified model and added to a new role specified in the 
 * method's params.
 * 
 * @param model Indicates the model from where is going to create the registers
 * @param collection The collections of objects from {model}
 * @param newRole The name of the new role 
 * @param roleDescription Description of the new role
 * @param cb Callback with two parameters (error, result) 
 */
const createRole = (model, collection, newRole, roleDescription, cb) => {
    model.create( collection, (err, users) => {
        if ( err ) return cb( err );
        // create the {newRole} role
        Role.create({
            name: newRole,
            description: roleDescription
        }, (err, role) => {
            if ( err ) cb( err );
            console.log(`Rol: ${newRole} created`)
            each( collection, (user, next) => {
                //make user part of {newRole}
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                }, (err, principal) => {
                    if ( err ) next ( err );
                    console.log('Principal created: ', principal);
                    next();
                })
            }, error => error ? cb( error ) : cb( null, 'Success' ));
        });
    });
}

// Execute createRole() function
parallel({
    planning: cb => {
        createRole( Planning, planningUsers.users, planningUsers.roleName, planningUsers.rolDescription, (error, result) =>
            error ? cb( error ) : cb ( null, result ))
    },
    boss: cb => {
        if( process.env.NODE_ENV !== 'production' ) {
          createRole( BossDepartment, bosses.users, bosses.roleName, bosses.rolDescription, (error, result) =>
            error ? cb( error ) : cb ( null, result ))
        } else {
          cb( null, "On production" )
        }
    },
    vicePrincipal: cb => {
      if( process.env.NODE_ENV !== 'production' ) {
        createRole( VicePrincipal, vicePrincipals.users, vicePrincipals.roleName, vicePrincipals.rolDescription, (error, result) =>
            error ? cb( error ) : cb ( null, result ))
      } else {
        cb( null, "On production" )
      }
    }
},
(error, result) => {
    if ( error ) throw error;
    console.log('Script succesfully finshed :D')
    process.exit(0);
})
