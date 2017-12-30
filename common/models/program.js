'use strict';

module.exports = Program => {

  //Validations.
  Program.validatesUniquenessOf('program_number', { message: 'El número del programa debe ser único.' });
  Program.validatesUniquenessOf('description', { message: 'El nombre del programa debe ser único.' });

  //Disable build-in methods.
  Program.disableRemoteMethodByName("deleteById", true);

};
