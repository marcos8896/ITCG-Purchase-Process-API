'use strict';

module.exports = Budgetkey => {
    Budgetkey.validatesLengthOf('budget_key_id', {max: 15, message: {min: 'La clave presupuestal es muy larga.'}});
    Budgetkey.validatesUniquenessOf('budget_key_id', {message: 'La clave presupuestal debe ser unica.'});

};
