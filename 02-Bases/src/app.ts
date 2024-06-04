// const {emailTemplate} = require('./js-foundation/01-template.js')
// require('./js-foundation/02-destructuring.js')
// const { getUserById } = require('./js-foundation/03-callbacks.js');
// const {getUserById} = require('./js-foundation/04-arrows.js')
// console.log(emailTemplate)
// const { getUUID, getAge } = require('./plugins');

import { getPokemonById } from "./js-foundation/06-promises";
import { buildLogger } from "./plugins/logger.plugin";

// require('./js-foundation/05-factory.js')
// const { buildMakePerson } = require('./js-foundation/05-factory');

// const makePerson = buildMakePerson({ getUUID, getAge });

// const obj = { name: 'John', birthdate: '1998-9-29' };

// const john = makePerson(obj);

// console.log({john});

// const id = 2;

// getUserById(id, (error, user) => {
//   if (!user) {
//     throw new Error(error);
//   }

//   console.log({ user });
// });

// console.log(emailTemplate);

const logger = buildLogger("app.js");

logger.log("Hola Mundo")
logger.error("Esto es algo malo...")


getPokemonById("4")
  .then((pokemon) => console.log({ pokemon }))
  .catch((err) => console.error({err}))
  .finally(() => console.log('Finalmente'))



