// const models = require('../server/server').models;
// const faker = require('faker/locale/es_MX');
// const loadJsonFile = require('load-json-file');
// console.log('loadJsonFile: ', loadJsonFile);
const arrayModels = [];

function getModelsContentFromJSONs() {
  const readfiles = require('node-readfiles');

  readfiles('./common/models/', { filter: '*.json' }, (err, filename, contents) => {
    if (err) throw err;
    arrayModels.push({ name: JSON.parse(contents).name, properties: Object.keys(JSON.parse(contents).properties) });
  }).then(function (files) {

    console.log('arrayModels: ', JSON.stringify( arrayModels, null, '  ' ));
  }).catch(function (err) {
    console.log('Error reading files:', err.message);
  });
}

getModelsContentFromJSONs();
// function seedModel( model ,records ) {

//   const promises = [];
//   for (let i = 0; i < records; i++) {
//     promises.push(models.Provider.create({
//       "name": faker.name.findName(),
//       "phone": faker.phone.phoneNumber(),
//       "address": faker.address.streetAddress() + faker.address.city() + faker.address.country(),
//       "email": faker.internet.email()
//     }));
//   }

//   return Promise.all(promises);

// }

// function seedAll() {
//   const seedsPromises = [ 
//     seedModel( "Provider" ) ];

//   Promise.all(seedsPromises).then( () => {
//     console.log("Ya estufas.");
//     // process.exit();
//   });
// }

// seedAll();