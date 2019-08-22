const server = require('./server.js');
require('dotenv').config();

const port = process.env.PORT || 000;

server.listen(port, () => {
  console.log(`*** Listening on port ${port}***`);
});
