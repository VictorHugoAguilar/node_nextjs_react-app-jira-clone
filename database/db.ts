
import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {

    console.log('Connecting to MongoDB...');

    if (mongoConnection.isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if (mongoConnection.isConnected === 1) {
            console.log('MongoDB is already connected, last connection is used');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URI || '');

    mongoConnection.isConnected = 1;
    console.log('MongoDB is connected');
}

export const disconnect = async () => {

    if (mongoConnection.isConnected === 0) {
        return;
    }

    await mongoose.disconnect();
    console.log('MongoDB is disconnected');
}