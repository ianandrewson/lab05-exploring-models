const app = require('./lib/app');
require('../lib/utils/connect.js')();

app.listen('7890', () => {
  // eslint-disable-next-line no-console
  console.log('started');
});
