const   app = require('../server/server'),
        { parallel, each, waterfall } = require('async'),
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
 * Main method for creating a new collection of registers to
 * a specified model and added to a new role specified in the 
 * method's params.
 * @author Brandon Emmanuel Villa Cárdenas <bornofos@gmail.com>
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param model Indicates the model from where is going to create the registers
 * @param collection The collections of objects from {model}
 * @param newRole The name of the new role 
 * @param roleDescription Description of the new role
 * @param cb Callback with two parameters (error, result) 
 */
const createRole = (model, collection, newRole, roleDescription, cb) => {

  waterfall([

      //Verify if the current model exists on the database.
      next => {
        each(collection, (userToRegister, callback) => {
          
          model.exists(userToRegister.id)
          .then( exists => {
            userToRegister.alreadyExists = exists;
            callback();
          })
          .catch( error => next(error));
        },
        err => {
          if(err) 
            return next(error);
          
          return next(null, collection);
        })

      },

      //Create the current models on the datasource if they do not exist yet.
      (collectionOfUsers, next) => {
        
        //Users that do not exists currently on the database.
        const usersToRegister = collectionOfUsers.filter( user => !user.alreadyExists )

        model.create( usersToRegister, (err, createdUsers) => {
          
          if ( err )
            return next( err );
          
          return next(null, createdUsers);

        });
      },
      
      //Return an model instance whether with an existing role or with a null.
      (createdUsers, next) => {
        
        Role.findOne({ where: {name: newRole} },
          function(err, role){
            if (err) 
            return next(err);
            
            return next(null, createdUsers, role);

        })
      },

      //Create a new Role if the passed role (second param called 'role') is null.
      //Otherwise it will use the one that is being passed as second param. 
      (createdUsers, role, next) => {
        
        if ( role === null ) {

          //Create the {newRole} role
          Role.create({ name: newRole, description: roleDescription }, (err, role) => {
              
            if ( err ) 
              return next( err );
            
            console.log(`Rol: ${newRole} created`)
            return next(null, role, createdUsers);

          });

        } else {
          return next(null, role, createdUsers);

        }
      },

      //Attach role to every single user.
      (role, createdUsers, next) => {

        each( createdUsers, (user, callback) => {
          //make user part of {newRole}
          role.principals.create({
              principalType: RoleMapping.USER,
              principalId: user.id
          }, (err, principal) => {
              if ( err ) callback( err );
              console.log('Principal created: ', principal);
              callback();
          })
        }, error => error ? next( error ) : next( null, 'Success'));
      }
    ],

    (error, message) => {
      if (error)
        return cb(error);
      
      console.log('Message: ', `${message} for ${newRole}`);
      return cb(null, message);

    }
  );

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
    console.log('Script successfully finished :P');
    process.exit(0);
})
