import mongoose from 'mongoose';
import Movie from './movie.model.js';
import Role from './role.model.js';
import User from './user.model.js';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.movie = Movie;

db.ROLES = ['USER', 'MANAGER', 'TEAMLEADER', 'FLOORSTAFF'];

export default db;
