var server = require('./server');
var ds = server.dataSources.posgresql_ds;

/**
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * Run the proper migrations loading automatically all the new custom models.
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


/**
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * Return a promises which contains all the Loobpack's custom models with 
 * all its properties on it.
 * @returns {Promise<Array>} 
 */
function getModelsContentFromJSONs() {
  const readfiles = require('node-readfiles');
  let arrayModels = [];

  return readfiles('./common/models/', { filter: '*.json' }, (err, filename, contents) => {
    if (err) throw err;

    let json = {
      filename,
      name: JSON.parse(contents).name,
      properties_seeds: Object.keys(JSON.parse(contents).properties)
    }

    arrayModels.push(json);

  }).then(() => arrayModels)
    .catch( error => console.log(error));
}


/**
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * Return a promise which contains only the names from all the Loobpack's custom models.
 * @returns {Promise<Array>} 
 */
async function getNameModelsArray() {
  
  let names = [];
  
  try {
    names = await getModelsContentFromJSONs().then( models => models.map( model => model.name));
  } catch (error) {
    console.log(error);
  }
  
  return names;
}
