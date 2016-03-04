import express from 'express';

const app = express();

app.use(express.static('clients'));

app.get('/', (request, response) => {
  response.sendFile('./index.htm');
});

export default app;
