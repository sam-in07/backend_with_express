const express = require('express');

const { z } = require('zod');
const app = express();
app.use(express.json());
app.post('/auth/sign-up', (req, res) => {
    // console.log(req.body);
    // res.json({ message: 'Sign-up endpoint' });
    // if(req.body.firstName.lenght <= 2) {
    //     return res.status(400).json({ message: 'First name must be longer than 2 characters' });
    // }
    const userCreateSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });
  //userCreateSchema data ta pass korietssii 
  const output = userCreateSchema.parse(req.body);
  console.log(output);


});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});