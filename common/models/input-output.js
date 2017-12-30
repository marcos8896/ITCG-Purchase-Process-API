'use strict';

module.exports = Inputoutput => {

  //Validations.
  Inputoutput.validatesUniquenessOf('bill', { message: 'La factura debe ser única.' });

  //Disable build-in methods.
  Inputoutput.disableRemoteMethodByName("deleteById", true);
};
