'use strict';

module.exports = Department => {
    Concept.validatesUniquenessOf('name', {message: 'El nombre del departamento debe ser único.'});
};
