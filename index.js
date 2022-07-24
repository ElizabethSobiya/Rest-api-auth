const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const app = express()
const port = 8080
const jwt = require('jsonwebtoken')

let secretKey = "shhkkrr";

app.use(express.json())

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
     const token = jwt.sign({email}, secretKey);
     res.json(token)
})

app.get('/products', (req, res) => {
   let token = req.headers.authorization;
   if(!token){
    return res.json('no token is provided')
    }else{
    try{
jwt.verify(token, secretKey)
     return res.json('products data')
   }catch(err){
       return res.json('invalid token')
   } 
  }
})

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
})

