const express = require('express')
const app = express()   
const mongoose = require('mongoose');
const productRoutes = require('./routes/products.routes.js')
const categoryRoutes = require('./routes/categories.routes.js')
const brandRoutes = require('./routes/brand.routes.js')
const userRoutes = require('./routes/users.routes.js')
const cartRoues = require('./routes/cart.routes.js')

app.use(express.json())
app.use('/products',productRoutes.router)
app.use('/brands',brandRoutes.router)
app.use('/categories',categoryRoutes.router)    
app.use('/users',userRoutes.router) 
app.use('/cart',cartRoues.router)

main().catch(err=>console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/ecommerce')
    console.log('database connected')
}

app.get('/',(req,res)=>{
    res.json({status:"success"})
})


app.listen(8000, () => {
    console.log('http://localhost:8000');
});