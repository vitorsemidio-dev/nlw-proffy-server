import express from 'express';
import cors from 'cors';

// import routes from './routes';
import routes from '@shared/infra/http/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
