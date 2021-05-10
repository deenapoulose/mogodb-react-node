const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 
const Foodmodel = require('./models/Food');
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://root:root@crud.5xdmj.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,

});
mongoose.set("useFindAndModify", false);
// app.get('/',async(req,res)=>{
//     const food= new Foodmodel({foodName:"rice" ,daysSinceIAte:3});
//     try{

//         await food.save();
//         res.send("inserted")
//     }
//     catch(err){
//         console.log(err);

//     }

// })
app.post('/insert',async(req,res)=>{

    const fname= req.body.fname;
    const age = req.body.age;
    console.log(fname)
    const food= new Foodmodel({foodName:fname ,daysSinceIAte:age});
    try{

        await food.save();
        res.send("inserted")
    }
    catch(err){
        console.log(err);

    }

})
app.get('/read',async(req,res)=>{
    Foodmodel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
//{ $where:{foodName:"de"}},
    
})
app.delete('/del/:id',async (req,res)=> {
    const id = req.params.id;
    Foodmodel.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    // //const id= req.body.id
    // const id =req.params.id;
    // console.log(id)
    // res.send(id);
   // await Foodmodel.deleteOne({_id: req.params.id})
    //await Foodmodel.deleteOne(id);
        // await  Foodmodel.findByIdAndRemove(id).exec();
        // res.send("deleted")

})
app.put('/update/:id' ,async(req,res)=>{
    const id1 = req.params.id;
    const newna=req.body.efname;
    const age =req.body.ea;
    console.log('id1',id1);
    console.log('id1',newna);
    console.log('id1',age);
    try{
       await Foodmodel.findById(id1,(err,upf)=>{
            upf.foodName = newna;
            upf.daysSinceIAte=age;
            upf.save();
            res.send("updated");


        })

    }
    catch(err){
        console.log(err);
    }
})
app.listen('3001',()=>{
    console.log('server running at port 3001')
})
