'use strict';

module.exports = Project => {
  //Validations.
  Project.validatesLengthOf('project_number', { max: 5, message: { max: 'El número del projecto superó el rango.' } });
  Project.validatesUniquenessOf('project_number', { message: 'El número del proyecto debe ser único.' });
  Project.validatesUniquenessOf('description', { message: 'El nombre del proyecto debe ser único.' });

  //Disable build-in methods.
  Project.disableRemoteMethodByName("deleteById", true);
};
