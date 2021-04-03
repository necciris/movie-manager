import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import db from './app/models/index.js';
import Role from './app/models/role.model.js';
import authRoutes from './app/routes/auth.routes.js';
import dbConfig from './app/db.config.js';
import userRoutes from './app/routes/user.routes.js';
import movieRoutes from './app/routes/movie.routes.js';

//App Config
const app = express();
const port = process.env.PORT || 8080;

const connection_url = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@cluster0.c49r9.mongodb.net/${dbConfig.db}?retryWrites=true&w=majority`;

//Middelwares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB Config
db.mongoose
    .connect(connection_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Successfully connect to MongoDB.');
        initial();
    })
    .catch((err) => {
        console.error('Connection error', err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'USER',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'USER' to roles collection");
            });

            new Role({
                name: 'MANAGER',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'MANAGER' to roles collection");
            });

            new Role({
                name: 'TEAMLEADER',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'TEAMLEADER' to roles collection");
            });

            new Role({
                name: 'FLOORSTAFF',
            }).save((err) => {
                if (err) {
                    console.log('error', err);
                }

                console.log("added 'FLOORSTAFF' to roles collection");
            });
        }
    });
}

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to bezkoder application.' });
});

authRoutes(app);
userRoutes(app);
movieRoutes(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
