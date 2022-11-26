const http = require('http');
require('./config');
require('./database');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
