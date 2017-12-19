'use strict';

module.exports = Concept => {
    Concept.validatesUniquenessOf('description', {message: 'La descripción no puede ser la misma que otro registro.'});
};
