'use strict';

module.exports = Budgetkey => {

  //Validations.
  Budgetkey.validatesLengthOf('budget_key_id', {max: 15, message: {max: 'La clave presupuestal es muy larga.'}});
  Budgetkey.validatesUniquenessOf('budget_key_id', {message: 'La clave presupuestal debe ser unica.'});

  //Disable build-in methods.
  Budgetkey.disableRemoteMethodByName("deleteById", true);


};
