const models = require('../server/server').models;
const faker = require('faker/locale/es_MX');

function seedProvider( records ) {

  const promises = [];
  for (let i = 0; i < records; i++) {
    promises.push(models.Provider.create({
      "name": faker.name.findName(),
      "phone": faker.phone.phoneNumber(),
      "address": faker.address.streetAddress() + faker.address.city() + faker.address.country(),
      "email": faker.internet.email()
    }));
  }

  return Promise.all(promises);

}

function seedConcept( records ) {
  
  const promises = [];
  for (let i = 0; i < records; i++) {
    promises.push(models.Concept.create({
      "description": faker.lorem.sentences(10)
    }));
  }

  return Promise.all(promises);

}

function seedAll() {
  const seedsPromises = [ seedProvider(25), seedConcept(25) ];
  
  Promise.all(seedsPromises).then( () => {
    console.log("Ya estufas.");
    process.exit();
  });
}

seedAll();