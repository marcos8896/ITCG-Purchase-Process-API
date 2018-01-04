'use strict';

module.exports = Conceptrequisition => {

  //Disable build-in methods.
  Conceptrequisition.disableRemoteMethodByName("deleteById", true);
  
};
