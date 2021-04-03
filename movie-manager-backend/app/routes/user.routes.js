import { allAccess, userBoard, managerBoard, teamleaderBoard } from '../controllers/user.controller.js';
import authJwt from '../middleware/authJwt.js';

const userRoutes = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.get('/api/test/all', allAccess);

    app.get('/api/test/user', [authJwt.verifyToken], userBoard);

    app.get('/api/test/manager', [authJwt.verifyToken, authJwt.isManager], managerBoard);

    app.get('/api/test/leader', [authJwt.verifyToken, authJwt.isTeamLeader], teamleaderBoard);
};

export default userRoutes;
