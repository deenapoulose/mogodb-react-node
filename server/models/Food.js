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
const Food = mongoose.model("Food",Foodschema)
module.exports = Food;
