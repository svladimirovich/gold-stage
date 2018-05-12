import * as express from 'express';

import * as eventsRouter from './events/events.router';
import { newsList } from '../assets/news';

const router = express.Router();

router.get('/news', (request, response) => {
    response.status(200).json(newsList);
});

router.use('/events', eventsRouter);

module.exports = router;

