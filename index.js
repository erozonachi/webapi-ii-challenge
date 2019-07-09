const express = require('express');
const postsRoutes = require('./routes/posts');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use('/api/posts', postsRoutes);

server.get('/', (req, res) => {
  res.status(200).send('Eneh\'s Posts API Service');
});

server.listen(port, () => {
  console.log(`Server running on port :- ${port}`);
});
