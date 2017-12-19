'use strict';

module.exports = function(Program) {
    Program.validatesUniquenessOf('program_number', {message: 'El número del programa debe ser único.'});
    Program.validatesUniquenessOf('description', {message: 'El nombre del programa debe ser único.'});

};
