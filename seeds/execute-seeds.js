const waterfall = require('async').waterfall;
const faker = require('faker/locale/es_MX');
const arrayModels = [];
const models = require('../server/server').models;

function getModelsSeedsFromJSONs( cb ) {
  
  const readfiles = require('node-readfiles');

  readfiles('./seeds/seedModels/', { filter: '*.json' }, (err, filename, contents) => {
    if (err) throw err;

    let json = {
      filename,
      name: JSON.parse(contents).name,
      properties_seeds: JSON.parse(contents).properties_seeds
    }

    arrayModels.push(json);
  })
    .then(files => cb(null))
    .catch(err => cb(err));
}

function seedProvider( cb, model, number ) {

    let Model = arrayModels.find( model => model.name == "Provider")
    
    let fakeModel = { }
    const fakeModelsArray = [];
    for (let i = 0; i < 10; i++) {
      Model.properties_seeds.forEach( prop => 
        fakeModel[Object.keys(prop)[0]] = faker.fake(Object.values(prop)[0])
      )
      fakeModelsArray.push(fakeModel);
      fakeModel = { };
    }

    models.Provider.create(fakeModelsArray)
    .then( () => cb(null))
    .catch( err => cb(err))
  
}

waterfall([
  cb => getModelsSeedsFromJSONs(cb),
  (cb, model, numRecords) => seedProvider(cb, model, numRecords)
], err => {
  if(err) console.log('Error on waterfall: ', err);
  else console.log("Ya acabé, men");
});