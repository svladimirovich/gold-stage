import * as express from 'express';

import { ErrorResponse, OkResponse } from '../helpers/responses';
import { AdminUser } from '../../models/users';
import { usersList } from '../../assets/users';
import { generateGuid } from '../../helpers/guid';

const router = express.Router();

router.use(express.json());

router.get('/', (request, response) => {
    response.status(200).json(usersList);
});

// authorize admin user
router.post('/login', (request, response) => {
    let providedCredentials = request.body as AdminUser;
    if(providedCredentials.login && providedCredentials.password) {
        const login = providedCredentials.login.toLowerCase();
        // TODO: use MD5 or something for the password
        const existingUser = usersList.find(user => (user.login.toLowerCase() == login && user.password == providedCredentials.password));
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

module.exports = router;