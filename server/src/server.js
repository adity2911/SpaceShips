const http = require('http');
const mongoose = require('mongoose');

const app = require('./app.js');
const { loadPlanetsData } = require('./model/planets.model');

const PORT = process.env.PORT || 8000;
const mongoose_url = 'mongodb+srv://nasa-cluster:0VVnsustQHrHHjDT@nasa-api.u6efh.mongodb.net/?retryWrites=true&w=majority';


const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongoose Connection stablished');
});

mongoose.connection.on('error', (e) => {
    console.error(e);
});

async function listenServer() {
    mongoose.connect(mongoose_url);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`listening on PORT: ${PORT}`);
    });
}

listenServer();