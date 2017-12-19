// const models = require('../server/server').models;
// const faker = require('faker/locale/es_MX');
const asyncSeries = require('async').series;
let arrayModels = [];

function getModelsContentFromJSONs( cb ) {
  const readfiles = require('node-readfiles');

  readfiles('./common/models/', { filter: '*.json' }, (err, filename, contents) => {
    if (err) throw err;

    let json = {
      filename, 
      name: JSON.parse(contents).name, 
      properties_seeds: Object.keys(JSON.parse(contents).properties)      
    }

    arrayModels.push(json);
  })
  .then(files =>  cb( null ))
  .catch( err => {
    console.log('Error reading files:', err.message);
    cb( err );
  });
}

function prepareSeedsModels() {
  arrayModels.forEach( model => 
    model.properties_seeds = model.properties_seeds.map( prop => 
      prop = { [prop]: "" }
    )
  );
  console.log('arrayModels: ', JSON.stringify( arrayModels, null, '  ' ));
}

asyncSeries([
  cb => getModelsContentFromJSONs( cb ),
  cb => prepareSeedsModels( cb ),
  cb => seedModel( cb ) 
]);

function seedModel( cb ) {

  const promises = [];
  // console.log("gg", arrayModels[3].name);
  // for (let i = 0; i < records; i++) {
  //   promises.push(models[arrayModels[3].name].create({
  //     "name": faker.name.findName(),
  //     "phone": faker.phone.phoneNumber(),
  //     "address": faker.address.streetAddress() + faker.address.city() + faker.address.country(),
  //     "email": faker.internet.email()
  //   }));
  // }

  return Promise.all(promises);

}

function seedAll( cb ) {
  const seedsPromises = [ 
    seedModel( "Provider" ) ];

  Promise.all(seedsPromises).then( () => {
    console.log("Ya estufas.");
    // process.exit();
  });
}

// seedAll();