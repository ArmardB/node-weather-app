let asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof(a) === 'number' && typeof(b) === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 2500)
  })
}

asyncAdd(5,4).then((res) => {
  console.log('Result:', res);
  return asyncAdd(res, 23);
}).then((res) => {
  console.log('Results 2: ',res);
}).catch((err) => {
  console.log(err);
});

// let somePromise  = new Promise((resolve, reject) => {
//   setTimeout(() => {
//       resolve('Hey, it worked');
//       reject('Unable to fulfill promise');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });
