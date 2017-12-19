// const models = require('../server/server').models;
// const faker = require('faker/locale/es_MX');
const asyncSeries = require('async').series;
const fileExists = require('file-exists');
let arrayModels = [];

function getModelsContentFromJSONs(cb) {
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
    .then(files => cb(null))
    .catch(err => {
      console.log('Error reading files:', err.message);
      cb(err);
    });
}

function prepareSeedsModels(cb) {
  arrayModels.forEach(model =>
    model.properties_seeds = model.properties_seeds.map(prop =>
      prop = { [prop]: "" }
    )
  );
  // console.log('arrayModels: ', JSON.stringify( arrayModels, null, '  ' ));
  cb(null);
}

function checkJSONSeedsAvailability(cb) {

  let promises = [];
  arrayModels.forEach(model => {
    promises.push(
      fileExists(`./seeds/seedModels/${model.filename}`).then(exists => {
        model.fileExists = exists;
        // console.log(exists); // OUTPUTS: true or false
      })
    )
  })



  Promise.all(promises).then(() => cb(null));
  // const parallel = require('async').parallel;

  // parallel( fileExists() )
  // console.log('arrayModels: ', JSON.stringify( arrayModels, null, '  ' ));

}

function writeRemainingJSONFiles(cb) {
  let each = require('async').each;
  // `./seeds/seedModels/${model.filename}`
  const remainingJSONs = arrayModels.filter(model => !model.fileExists);

  //Removed fileExists property to not write it on the JSON Seed files.
  remainingJSONs.forEach(json => delete json.fileExists);

  const jsonfile = require('jsonfile')

  each(remainingJSONs, (json, eachCallback) => {
    
    let file = `./seeds/seedModels/${json.filename}`
    let obj = json

    jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {
      if (err) eachCallback(err);
      eachCallback();
    })

  }, err => {
    if (err) cb(err);
    else cb(null);

  })
}

asyncSeries([
  cb => getModelsContentFromJSONs(cb),
  cb => prepareSeedsModels(cb),
  cb => checkJSONSeedsAvailability(cb),
  cb => writeRemainingJSONFiles(cb),
  cb => seedModel(cb)
]);

function seedModel(cb) {
  console.log("izi")
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

function seedAll(cb) {
  const seedsPromises = [
    seedModel("Provider")];

  Promise.all(seedsPromises).then(() => {
    console.log("Ya estufas.");
    // process.exit();
  });
}

// seedAll();