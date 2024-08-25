const express = require('express')
const app = express()   
const mongoose = require('mongoose');

app.get('/',(req,res)=>{
    res.json({status:"success"})
})

app.listen(8000, () => {
    console.log('http://localhost:8000');
});