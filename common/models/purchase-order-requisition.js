'use strict';

module.exports = Purchaseorderrequisition => {

  //Validations.

  //Disable build-in methods.
  Purchaseorderrequisition.disableRemoteMethodByName("deleteById", true);
};
