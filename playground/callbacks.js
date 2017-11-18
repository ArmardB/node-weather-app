let getUser = (id, callback) => {
  user = {
    id: id,
    name: 'Armard'
  };
  setTimeout(()=> {
    callback(user);
  }, 3000)
};

getUser(23, (user) => {
  console.log(user);
});
