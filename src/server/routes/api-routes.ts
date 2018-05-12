import * as express from 'express';

import * as eventRoutes from './events';
import * as userRoutes from './users';
import { newsList } from '../../assets/news';
import { usersList } from '../../assets/users';
import { ServerConfiguration } from '../../../config.server';

const router = express.Router();
const configuration = new ServerConfiguration();

// adding default admin user
usersList.push({
    login: configuration.AdminLogin,
    password: configuration.AdminPassword,
    name: "Administrator"
});

router.get('/news', (request, response) => {
    response.status(200).json(newsList);
});

router.use('/events', eventRoutes);

router.use('/users', userRoutes);

module.exports = router;

