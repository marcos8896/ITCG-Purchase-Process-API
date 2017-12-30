'use strict';

module.exports = Concept => {

  //Validations.
  Concept.validatesUniquenessOf('description', { message: 'La descripción no puede ser la misma que otro registro.' });

  //Disable build-in methods.
  Concept.disableRemoteMethodByName("deleteById", true);
};
