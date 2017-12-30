'use strict';

module.exports = Subdirection => {

  //Validations.
  Subdirection.validatesUniquenessOf('name', { message: 'Ya existe la subdirección.' });
  Subdirection.validatesUniquenessOf('boss_name', { message: 'Ya existe ese jefe en otra subdirección.' });

  //Disable build-in methods.
  Subdirection.disableRemoteMethodByName("deleteById", true);
};
