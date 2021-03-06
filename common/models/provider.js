'use strict';

module.exports = Provider => {
  //Validations.
  Provider.validatesUniquenessOf('name', { message: 'El nombre del proveedor debe ser único.' });
  Provider.validatesUniquenessOf('phone', { message: 'El teléfono del proveedor debe ser único.' });
  Provider.validatesUniquenessOf('address', { message: 'La dirección del proveedor debe ser único.' });
  Provider.validatesUniquenessOf('email', { message: 'El email del proveedor debe ser único.' });

  //Disable build-in methods.
  Provider.disableRemoteMethodByName("deleteById", true);
};
