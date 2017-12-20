//Example to run seeds
//node seeds/execute-seeds.js --model=Provider --numRecords=10

const series = require('async').series;
const faker = require('faker/locale/es_MX');
const arrayModels = [];
const models = require('../server/server').models;

const args = require('yargs').argv;
const singleModel = args.model;
const numRecords =  args.numRecords;


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

function seedModel( cb ) {
    let Model = arrayModels.find( model => model.name == singleModel)
    console.log('Model: ', Model);

    //Validate if the Model exists
    if( !!!Model ) return cb("Modelo no encontrado.");

    //Validate if numRecords is a valid number
    if(typeof( numRecords ) !== "number") return cb("Número de records no válido.")
    
    let fakeModel = { }
    const fakeModelsArray = [];
    for (let i = 0; i < numRecords; i++) {
      Model.properties_seeds.forEach( prop => 
        fakeModel[Object.keys(prop)[0]] = faker.fake(Object.values(prop)[0])
      )
      fakeModelsArray.push(fakeModel);
      fakeModel = { };
    }

    models[singleModel].create(fakeModelsArray)
    .then( () => cb(null))
    .catch( err => cb(err))
  
}

series([
  cb => getModelsSeedsFromJSONs(cb),
  cb => seedModel(cb)
], err => {
  if(err) console.log(err);
  else console.log("Ya acabé, men");
  process.exit(1);
});
