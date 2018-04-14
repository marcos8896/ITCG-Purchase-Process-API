const   app = require('../../server/server');
        
/** 
 * Obtain relation: 
 * VicePrincipal 
 *  (has) Subdirection 
 *      (has) Department 
 *          (has) BossDepartment 
 *              (has) Requisition
 * 
 * @param { string } vice_principalId the id of a VicePrincipal register
 * @param { function } cb Callback
 */
function getRequisitionsToSign(vicePrincipalId, cb) {
    const VicePrincipal = app.models.Vice_principal;

    const filter = {
        where: { id: vicePrincipalId },
        fields: [ 'name', 'id' ],
        include: {
            relation: 'subdirection',
            scope: {
                fields: ['id'],
                include: {
                    relation: 'department',
                    scope: {
                        fields: ['name', 'boss_departmentId'],
                        include: {
                            relation: 'boss_department',
                            scope: {
                                fields: ['name'],
                                include: {
                                    relation: 'requisition',
                                    scope: {
                                        where: { and: [
                                            { status: {'like': 'Esperando'} },
                                            { check_boss: {'like': 'Aceptado'} },
                                            { check_subdirection: {'like': 'Esperando'} },
                                            { check_planning: {'like': 'Esperando'} }
                                        ]},
                                        fields: ['id','date', 'action']
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    };

    /**
     * Expected object example:
     * VicePrincipal: {
     *      Subdirection: {
     *          Department: {
     *              BossDepartment: {
     *                  Requisition: { }
     *              }
     *          }
     *      }
     * }
     */

    VicePrincipal.findOne( filter )
        .then( instance => JSON.parse(JSON.stringify(instance)))
        .then( vicePrincipal => cb(null, vicePrincipal))
        .catch( err => cb(err))
}

module.exports = {
    getRequisitionsToSign
}