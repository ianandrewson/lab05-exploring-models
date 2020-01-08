const app = require('./lib/app');
require('../lib/utils/connect.js')();

app.listen('7890', () => {
  console.log('started');
});
