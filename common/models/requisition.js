'use strict';

module.exports = Requisition => {
  Requisition.validatesLengthOf('folio', {max: 6, message: {max: 'Folio supera el rango.'}});
  Requisition.validatesUniquenessOf('folio', {message: 'Folio no se puede repetir.'});
};
