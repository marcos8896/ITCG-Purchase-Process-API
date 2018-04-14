'use strict';
const app = require('../../server/server'),
      REQUISITION_STATES = require('../../shared/requisition_states');

module.exports = Purchaseorder => {

  
  
  //Validations.

  //Disable build-in methods.
  Purchaseorder.disableRemoteMethodByName("deleteById", true);

  /**
   * Remote hook description:
   * All PurchaseOrderRequisition objects from purchase_order_requisition 
   * array will be created on the datasource with their proper relationship
   * with their PurchaseOrder model.
   */
  Purchaseorder.afterRemote('create', (ctx, purchaseOrder, next) => {

    const PurchaseOrderRequisition = app.models.Purchase_order_Requisition;
    const relatedDetails = ctx.req.body.purchase_order_requisition;

    //Added purchaseOrder id to every relatedDetails model to make the
    //relationship.
    relatedDetails.forEach( detail => detail.purchase_orderId = purchaseOrder.id )
    
    const getAllIds =relatedDetails.map( detail => detail.requisitionId );

    //Remove duplicate values.
    const idToUpdates = Array.from(new Set(getAllIds));
    const Requisition = app.models.Requisition;

    //Promises to update every Requisition that matches the id from idToUpdates array
    let promises = idToUpdates.map((id, index) => 
      Requisition.upsertWithWhere(
        {id:  idToUpdates[index]}, {status : REQUISITION_STATES.ORDENADA}
      )
    );
    
    Promise.all([ ...promises, PurchaseOrderRequisition.create(relatedDetails)])
      .then( data => next())
      .catch( err => console.log('err', err));

  });

};
