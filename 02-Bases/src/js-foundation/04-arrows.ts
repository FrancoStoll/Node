interface User {
  id: Number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
];

const getUserById = (id: number, callback: (err?: string, user?: User) => void) => {
  const user = users.find((user) => user.id === id);

  user ? callback(undefined, user) : callback(`User not fount with the id ${id}`);

  // if (!user) {
  //   return callback(`User not found with the id ${id}`);
  // }

  // return callback(null, user);
};

// function getUserById(id, callback) {
//   const user = users.find(function (user) {
//     return user.id === id;
//   });

//   if (!user) {
//     return callback(`User not found with id ${id}`);
//   }

//   return callback(null, user);
// }

module.exports = {
  getUserById: getUserById,
};
