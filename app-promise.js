const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geocodeURL)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    console.log(response.data.results[0].formatted_address);

    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/bad33025e46b562f27883f79cd5cd6de/${latitude},${longitude}`;
    
    return axios.get(weatherURL);
  }).then((response) => {
    const temp = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The current temperature is ${temp}. It feels like ${apparentTemperature}`);
  })
  .catch((err) => {
    if (err.code === 'ENOTEFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(err.message);
    }
  });
