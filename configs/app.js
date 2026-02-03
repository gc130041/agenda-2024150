'use strict';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import userRoutes from '../src/users/user.routes.js';
import contactRoutes from '../src/contacts/contact.routes.js';
import taskRoutes from '../src/tasks/task.routes.js';

const BASE_URL = '/agenda/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/contacts`, contactRoutes);
    app.use(`${BASE_URL}/tasks`, taskRoutes);
}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3005;
    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Servidor de Agenda corriendo en el puerto ${PORT}`);
        });

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({ status: 'ok', service: 'Agenda API' });
        });

    } catch (error) {
        console.log(error);
    }
}

export { initServer };