import * as express from 'express';

const router = express.Router();

import { eventsList } from '../../assets/events';
import { generateGuid } from '../../helpers/guid';
import { StageEvent } from '../../models/events';
import { ErrorResponse, OkResponse } from '../helpers/responses';

router.use(express.json());

// select all
router.get('/all.json', (request, response) => {
    response.status(200).json(eventsList);
});

// select
router.get('/:id', (request, response) => {
    const event = eventsList.find(item => item.id == request.params.id);
    if(event) {
        response.status(200).json(event);
    } else {
        response.status(404).json(new ErrorResponse(404, "Could not find requested event."));
    }
});

// create
router.post('/', (request, response) => {
    let newEvent = request.body as StageEvent;
    eventsList.push(Object.assign({ id: generateGuid() }, newEvent));
    response.status(200).json(new OkResponse(200, "Created successfully"));
});

// update
router.patch('/:id', (request, response) => {
    let updatedEvent = request.body as StageEvent;
    const event = eventsList.find(item => item.id == request.params.id);
    if(event) {
        Object.assign(event, updatedEvent);
        response.status(200).json(new OkResponse(200, "Updated successfully"));
    } else {
        response.status(404).json(new ErrorResponse(404, "Could not find requested event."));
    }
});

// delete
router.delete('/:id', (request, response) => {
    const index = eventsList.findIndex(event => event.id == request.params.id);
    if(index > -1) {
        eventsList.splice(index, 1);        
        response.status(200).json(new OkResponse(200, "Deleted successfully"));
    } else {
        response.status(404).json(new ErrorResponse(404, "Could not find requested event."));
    }
});

module.exports = router;

