const mongoose = require('mongoose');
const Foodschema = new mongoose.Schema({
    foodName :{
        type : String,
        required : true,
    },
    daysSinceIAte :{
        type :Number,
        required :true,
    },

});
const Food = mongoose.model("food",Foodschema)
module.exports = Food;
