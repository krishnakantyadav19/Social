const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development',{ useUnifiedTopology: true },{ useNewUrlParser: true });

const db = mongoose.connection

db.on('error', console.error.bind(console, "Error connectiong to mongoose"))

db.once('open', function() {
    console.log('Connected to database :: MongoDb')
})

module.exports = db