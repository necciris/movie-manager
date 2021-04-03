import pkg from 'jsonwebtoken';
import auth from '../auth.config.js';
import Role from '../models/role.model.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

const isManager = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'MANAGER,') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require MANAGER, Role!' });
                return;
            }
        );
    });
};

const isTeamLeader = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'TEAMLEADER,') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require TEAMLEADER, Role!' });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isManager,
    isTeamLeader,
};

export default authJwt;
