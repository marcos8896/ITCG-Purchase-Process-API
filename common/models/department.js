'use strict';

module.exports = Department => {
    Department.validatesUniquenessOf('name', {message: 'El nombre del departamento debe ser único.'});
};
