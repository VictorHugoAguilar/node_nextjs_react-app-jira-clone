
import mongoose from 'mongoose';
import { showLogs } from '../utils';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    showLogs('info', '[db.ts] in connect');

    if (mongoConnection.isConnected) {
        showLogs('warn', 'MongoDB is already connected');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if (mongoConnection.isConnected === 1) {
            showLogs('warn', 'MongoDB is already connected, last connection is used');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URI || '');

    mongoConnection.isConnected = 1;
    showLogs('warn', 'MongoDB is connected');
}

export const disconnect = async () => {
    showLogs('info', '[db.ts] in disconnect');


    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    if (mongoConnection.isConnected === 0) {
        return;
    }

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    showLogs('warn', 'MongoDB is disconnected');
}