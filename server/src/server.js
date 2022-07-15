const http = require('http');

const app = require('./app.js');
const { loadPlanetsData } = require('./model/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function listenServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`listening on PORT: ${PORT}`);
    });
}

listenServer();