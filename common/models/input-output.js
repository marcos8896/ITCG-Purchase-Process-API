'use strict';

module.exports = function(Inputoutput) {
    Inputoutput.validatesUniquenessOf('bill', {message: 'La factura debe ser única.'});
};
