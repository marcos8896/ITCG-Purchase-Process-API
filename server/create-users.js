const   app = require('./server'),
        async = require('async'),
        Role = app.models.Role,
        RoleMapping = app.models.RoleMapping,
        BossDepartment = app.models.Boss_department,
        VicePrincipal = app.models.Vice_principal;

const bosses = [
    { id: 1, name: 'Ada Mabel', username: 'adamabel', email: 'adamabel@gmail.com', password: '123qwe' },
    { id: 2, name: 'Rodolfo', username: 'rodolfo', email: 'rodolfo@gmail.com', password: '123qwe' },
]
const vicePrincipals = [
    { id: 3, name: 'Juan Manuel Topete', username: 'jmanueltopete', email: 'jmanueltopete@gmail.com', password: '123qwe' },
    { id: 4, name: 'Michel', username: 'Michel', email: 'michel@gmail.com', password: '123qwe' },
]

const createBosses =  cb => {
    BossDepartment.create( bosses, (err, users) => {
        if ( err ) cb( err );
        // create the bossdepartment role
        Role.create({
            name: 'bossdepartment'
        }, function(err, role) {
            if ( err ) cb( err );
            console.log('Role created:', role);
            async.each( users, (user, next) => {
                //make user bossdepartment
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                },(err, principal) => {
                    if ( err ) next( err );
                    console.log('Principal created:', principal);
                    next();
                });
            }, error => error ? cb( error ) : cb( null, 'Success' ))
        });
    });
}
const createVicePrincipals = cb => {
    VicePrincipal.create( vicePrincipals, (err, users) => {
        if ( err ) cb( err );
        // create the viceprincipal role
        Role.create({
            name: 'viceprincipal'
        }, function(err, role) {
            if ( err ) cb( err );    
            console.log('Role created:', role);
            async.each( users, (user, next) => {
                //make user bossdepartment
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                }, (err, principal) =>{
                    if ( err ) next( err );
                    console.log('Created principal:', principal);
                    next();
                });
            }, error => error ? cb( error ) : cb( null, 'Success' ))
        });
    });
}


// Execute functions
async.waterfall([
    cb => {
        createBosses( (error, result) =>
            error ? cb( error ) : cb( null, result ))
    },
    (result, cb) => {
        createVicePrincipals( (error, result) => 
            error ? cb(error) : cb(null, result))
    }
],
(error, result) => {
    if ( error ) throw error;
    console.log('Script succesfully finshed :D')
})
