import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.json({
    message: 'Hello World !',
  });
});

app.post('/users', (request, response) => {
  const { name } = request.body;

  const user = { name };

  response.json(user);
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
