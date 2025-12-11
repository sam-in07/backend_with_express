const express = require('express');


const app = express();

app.post('/auth/sign-up', (req, res) => {
    res.json({ message: 'Sign-up endpoint' });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});