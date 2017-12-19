'use strict';

module.exports = function(Provider) {
    user.validatesUniquenessOf('name', {message: 'El nombre del proveedor debe ser único'});
};
