var server = require('./server');
var ds = server.dataSources.posgresql_ds;
const { getNameModelsArray } = require('../utils/models-information.service');


/**
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * Run the proper migrations by loading automatically all the new custom models.
 * @returns {*} 
 */
function runModelsMigrations() {
  getNameModelsArray().then( names => {

    //There's no need to add new custom models in the 'lbTables', since they are
    //being loaded automatically from the models' JSON files.
    var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', ...names];
  
    ds.automigrate(lbTables, function(er) {
      if (er) throw er;
      console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
      ds.disconnect();
    });
  })
}

runModelsMigrations();
