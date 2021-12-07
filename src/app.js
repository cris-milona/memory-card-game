const express = require('express');
const path = require('path');
const port = process.env.PORT;

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
