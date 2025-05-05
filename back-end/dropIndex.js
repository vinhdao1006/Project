const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

async function dropIndex() {
    try {
        // Get the specialties collection
        const db = mongoose.connection.db;
        const collection = db.collection('specialties');
        
        // Drop the code index
        await collection.dropIndex('code_1');
        console.log('Successfully dropped code index');
        
    } catch (error) {
        console.error('Error dropping index:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

dropIndex(); 