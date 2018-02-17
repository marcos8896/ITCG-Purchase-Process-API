'use strict';

module.exports = Requisition => {

  /**
   * Remote hook for validating if folio exists
   * If exists, validate its uniqueness
   */
  Requisition.beforeRemote('create', (ctx, unused, next) => {
    const folio = ctx.req.body.folio;
    if ( folio !== undefined )
      Requisition.validatesUniquenessOf('folio', { message: 'Folio no se puede repetir.' });
    next();
  });
  
  //Disable build-in methods.
  Requisition.disableRemoteMethodByName("deleteById", true);
};
