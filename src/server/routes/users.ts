import * as express from 'express';

import { ErrorResponse, OkResponse } from '../helpers/responses';
import { AdminUser } from '../../models/users';
import { usersList } from '../../assets/users';
import { generateGuid } from '../../helpers/guid';

const router = express.Router();

router.use(express.json());

// authorize admin user
router.post('/login', (request, response) => {
    let providedCredentials = request.body as AdminUser;
    if(providedCredentials.login && providedCredentials.password) {
        const login = providedCredentials.login.toLowerCase();
        // TODO: use MD5 or something for the password
        const existingUser = usersList.find((user: AdminUser) => (user.login.toLowerCase() == login && user.password == providedCredentials.password));
        if(existingUser) {
            if(!existingUser.ticket) existingUser.ticket = generateGuid();
            response.status(200).json({
                statusCode: 200,
                ticket: existingUser.ticket,
            });
            return;
        }
    }
    response.status(403).json(new ErrorResponse(403, "Invalid login or password."));
});

router.get('/byTicket', (request, response) => {
    const ticket = request.query && request.query.ticket;
    if(ticket) {
        const currentUser = usersList.find((user: AdminUser) => user.ticket == ticket);
        if(currentUser) {
            response.status(200).json({
                ...currentUser,
                password: undefined, // don't show password
                ticket: undefined // it is known anyway
            });
            return;
        }
    }
    response.status(403).json(new ErrorResponse(403, "User ticket invalid or expired."));
})

module.exports = router;