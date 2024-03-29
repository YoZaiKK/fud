import express from 'express';
import {PORT} from './config.js'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import fudRoutes from './routes/fud.routes.js'
import usrRoutes from './routes/usr.routes.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use(indexRoutes)
app.use(fudRoutes)
app.use(usrRoutes)

app.listen(PORT);
console.log(`Server on port ${PORT}`);

