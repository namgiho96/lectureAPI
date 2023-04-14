const app = require('./app');
const debug = require('debug');
const http = require('http');
const model = require('./database/models');

model.syncAllDB().then(()=>{
    function normalizePort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    const port = normalizePort(process.env.PORT || '3000');
    const server = http.createServer(app);
    app.set('port', port);
    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log(`Server is running, port number is ${addr.port}`);
        debug('Listening on ' + bind);
    }

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
})
