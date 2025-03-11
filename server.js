const serverJS = `
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Password = require('./db');

app.use(bodyParser.json());

app.post('/save', async (req, res) => {
    const { site, encryptedPassword, encryptedKey } = req.body;
    await Password.create({ site, encryptedPassword, encryptedKey });
    res.send({ message: 'Saved successfully' });
});

app.get('/retrieve', async (req, res) => {
    const passwords = await Password.find();
    res.send(passwords);
});

mongoose.connect('mongodb://localhost:27017/passwordVault', () => {
    console.log('Database connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
`;