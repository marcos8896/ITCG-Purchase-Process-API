'use strict';

module.exports = Purchaseorder => {

  //Validations.

  //Disable build-in methods.
  Purchaseorder.disableRemoteMethodByName("deleteById", true);
};
