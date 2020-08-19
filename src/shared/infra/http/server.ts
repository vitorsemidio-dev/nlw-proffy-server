import express from 'express';
import cors from 'cors';

import uploadConfig from '@config/upload';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/imagens', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.listen(3333, () => {
  console.log('Running on port 3333 🚀');
});
