'use strict';

module.exports = Subdirection => {
  Subdirection.validatesUniquenessOf('name', {message: 'Ya existe la subdirección.'});
  Subdirection.validatesUniquenessOf('boss_name', {message: 'Ya existe ese jefe en otra subdirección.'});
};
