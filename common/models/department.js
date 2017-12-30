'use strict';

module.exports = Department => {

  //Validations.
  Department.validatesUniquenessOf('name', { message: 'El nombre del departamento debe ser único.' });

  //Disable build-in methods.
  Department.disableRemoteMethodByName("deleteById", true);
};
