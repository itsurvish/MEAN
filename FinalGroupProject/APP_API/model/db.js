const mongoose = require('mongoose');
const dbURI = 'mongodb://dbUrvish:Cc8319006@cluster0-shard-00-00-1c2fk.mongodb.net:27017,cluster0-shard-00-01-1c2fk.mongodb.net:27017,cluster0-shard-00-02-1c2fk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'; 
mongoose.connect(dbURI, {dbName: 'bookDB'}); 
mongoose.connection.on('connected', () => { 
console.log(`Mongoose connected to ${dbURI}`); 
}); 
mongoose.connection.on('error', err => { 
console.log('Mongoose connection error:', err); 
}); 
mongoose.connection.on('disconnected', () => { 
console.log('Mongoose disconnected'); 
}); 
const gracefulShutdown = (msg, callback) => { 
mongoose.connection.close( () => { 
console.log(`Mongoose disconnected through ${msg}`); 
callback(); 
}); 
}; 
// For nodemon restarts 
process.once('SIGUSR2', () => { 
gracefulShutdown('nodemon restart', () => { 
process.kill(process.pid, 'SIGUSR2'); 
}); 
}); 
// For app termination 
process.on('SIGINT', () => { 
gracefulShutdown('app termination', () => { 
process.exit(0); 
}); 
}); 
// For Heroku app termination 
process.on('SIGTERM', () => { 
gracefulShutdown('Heroku app shutdown', () => { 
process.exit(0); 
}); 
});

require('./Book');