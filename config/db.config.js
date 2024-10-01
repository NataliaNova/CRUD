const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

MongoMemoryServer.create()
.then((mongoServer) => 
    mongoose.connect(mongoServer.getUri(), {
        dbName: 'crud-actividad2-modulo5',
    })
)
    .then(() => {
        console.log('MongoDB is running in memory');
    }).catch((err) => {
        console.error('An error occurred trying to connect to the database', err);
        process.exit(1);
    });


process.on('SIGINT', () => {
    mongoose
    .disconnect()
    .then(() => {
        console.log('MongoDB is disconnected');
        process.exit(0);
    }).catch((err) => {
        console.error('An error occurred trying to disconnect the database', err);
        process.exit(1);
    });
});

         
     