'use strict';

module.exports = function(Provider) {
    Provider.validatesUniquenessOf('name', {message: 'El nombre del proveedor debe ser único'});
};
