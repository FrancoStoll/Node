// importo las funciones que necesito en el archivo al cual llamo


interface BuildMakePersonOptions {

  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface PersonOptions {
  name: string;
  birthdate: string
}

const buildMakePerson = ({ getUUID, getAge }: BuildMakePersonOptions) => {
  // Retorno la funcion que crea a la persona
  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name: name,
      birthdate: birthdate,
      age: getAge(birthdate),
    };
  };
};

// const obj = { name: 'John', birthdate: '1998-09-29' };

// const john = buildPerson(obj);

// console.log(john);

module.exports = {
  buildMakePerson,
};
