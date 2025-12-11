const express = require('express');


const app = express();
app.use(express.json());
app.post('/auth/sign-up', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Sign-up endpoint' });
    // if(req.body.firstName.lenght <= 2) {
    //     return res.status(400).json({ message: 'First name must be longer than 2 characters' });
    // }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});