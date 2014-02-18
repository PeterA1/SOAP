var Factory = require('rosie').Factory;

Factory.define('livebooking')
  .attr('location', 'Baker Street')
  .attr('country', 'GB');

module.exports = Factory
