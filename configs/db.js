'use strict';
import mongoose from 'mongoose';

export const dbConnecion = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Error de conexión');
            mongoose.disconnect();
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conectado a la base de datos Agenda');
        });

        await mongoose.connect(process.env.URI_MONGODB, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
    } catch (error) {
        console.log(`Error al conectar la db: ${error}`);
        process.exit(1);
    }
};