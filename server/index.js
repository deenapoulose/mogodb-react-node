const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Foodmodel = require('./models/Food');
app.use(express.json());


mongoose.connect("mongodb+srv://root:root@crud.5xdmj.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,

});
app.get('/',async(req,res)=>{
    const food= new Foodmodel({foodName:"rice" ,daysSinceIAte:3});
    try{

        await food.save();
        res.send("inserted")
    }
    catch(err){
        console.log(err);

    }

})

app.listen('3001',()=>{
    console.log('server running at port 3001')
})
