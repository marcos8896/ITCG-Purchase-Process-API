const { waterfall } = require('async');
const app = require('../../server/server');
const uuidv1 = require('uuid/v1');
/**
 * Remote hook description:
 * Before create a new register, a unique id (built with uuid library)
 * will be added to that request. This with the reason of avoid same 
 * ids between Bossdepartment, Vice_principal and Planning models 
 */
function beforeRemoteCreate(ctx, unused, next) {
    ctx.req.body.id = uuidv1();
    next();
}
/**
 * Remote hook description:
 * 'type' property will be added to the instance (user) that will be 
 * returned in the login request. With 'type' property, the client
 * application will know which type of user is loggin in
 */
function afterRemoteLogin(ctx, user, next) {
    user.type = process.env.ROL_PLANNING;
    console.log(user)
    next();
} 

/**
 * Add a Boss_department register to a role by its id
 * 
 * @param {string} boss_departmentId the id of a Boss_department register
 * @param {function} cb Callback
 */
function addBoss(boss_departmentId, cb) {
    const BossDepartment = app.models.Boss_department;
    addUserToRol( BossDepartment, boss_departmentId, 'bossdepartment' )
        .then( principal => cb( null, principal ))
        .catch( error => cb( error ))
}

/**
 * Add a Vice_principal register to a role by its id
 * 
 * @param {string} vice_principalId the id of a Vice_principal register
 * @param {function} cb Callback
 */
function addVicePrincipal(vice_principalId, cb) {
    const VicePrincipal = app.models.Vice_principal;
    addUserToRol( VicePrincipal, vice_principalId, 'viceprincipal')
        .then( principal => cb( null, principal ))
        .catch( error => cb( error ))
}

/**
 * Associate an id to a specific role
 * 
 * @param {string} rolName name of the role 
 * @param {string} id id that will be added to the rolName
 */
function addRole( rolName, id ) {
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
 * The whole process to add a user to a rol.
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
            },
            // Change hasRole = true
            (principal, next) =>  {
                Model.updateAll({ id }, { hasRole: true }, (err, info) =>
                    err ? next(err) : next(null, principal));
            }
        ],
        (err, principal) => err ? reject( err ) : resolve( principal ))

    })
}

module.exports = {
    beforeRemoteCreate,
    afterRemoteLogin,
    addBoss,
    addVicePrincipal
}